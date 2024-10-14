package pl.pwr.ite.server.client.web.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.RegistrationDto;
import pl.pwr.ite.server.client.web.dto.RegistrationEntryDto;
import pl.pwr.ite.server.client.web.mapper.RegistrationMapper;
import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.model.entity.registration.Registration;
import pl.pwr.ite.server.model.entity.registration.RegistrationEntry;
import pl.pwr.ite.server.model.entity.registration.RegistrationLock;
import pl.pwr.ite.server.model.entity.registration.RegistrationPart;
import pl.pwr.ite.server.model.enums.Permission;
import pl.pwr.ite.server.model.filter.RegistrationFilter;
import pl.pwr.ite.server.service.*;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;
import pl.pwr.ite.server.web.exception.ApplicationError;
import pl.pwr.ite.server.web.exception.ApplicationException;

import java.time.LocalDateTime;
import java.util.UUID;

@Component
public class RegistrationFacade extends EntityServiceFacade<Registration, RegistrationFilter, RegistrationService, RegistrationDto, RegistrationDto.Properties, RegistrationMapper> {

    private final RegistrationLockService registrationLockService;
    private final RegistrationPartService registrationPartService;
    private final RegistrationEntryService registrationEntryService;
    private final ClockService clockService;
    private final UserService userService;

    public RegistrationFacade(RegistrationService service, RegistrationMapper mapper, SecurityFacade securityFacade, RegistrationLockService registrationLockService, RegistrationPartService registrationPartService, RegistrationEntryService registrationEntryService, ClockService clockService, UserService userService) {
        super(service, mapper, securityFacade);
        this.registrationLockService = registrationLockService;
        this.registrationPartService = registrationPartService;
        this.registrationEntryService = registrationEntryService;
        this.clockService = clockService;
        this.userService = userService;
    }

    //TODO: add option to remove person but only by original entry creator (add field to RegistrationEntry) or person
    // who was registered
    // If user who is registering himself is registered somewhere else remove him from that place and register in new one

    @Transactional
    public RegistrationEntry registerEntry(UUID partId, RegistrationEntryDto dto) {
        var part = registrationPartService.findById(partId);
        if(part == null) {
            throw new ApplicationException(ApplicationError.RegistrationPartNotFound);
        }
        if(part.getEntries().size() >= part.getEntryLimit()) {
            throw new ApplicationException(ApplicationError.RegistrationFull);
        }

        var authenticatedUser = securityFacade.getAuthenticatedUserReference();
        var lock = registrationLockService.findByPartId(part.getId());
        if(lock != null && !lock.getOwnerId().equals(authenticatedUser.getId())) {
            throw new ApplicationException(ApplicationError.RegistrationPartLocked);
        }

        // User is owner of lock, refresh lock before any further action
        if(lock == null) {
            lock = createRegistrationLock(userService.findById(authenticatedUser.getId()), part);
        } else {
            refreshLock(lock, part);
        }
        lock = registrationLockService.saveAndFlush(lock);

        var userCode = dto.getUserCode();
        var userToRegister = userService.findByCode(userCode);
        if(userToRegister == null) {
            throw new ApplicationException(ApplicationError.UserWithCodeNotFound);
        }

        var entry = registrationEntryService.findByUserId(userToRegister.getId());
        // User is already registered in another entry. If the user who is registering is the user who was registered
        // then change registration
        if(entry != null && !entry.getPartId().equals(partId) && entry.getUserId().equals(authenticatedUser.getId())) {
            changeRegistration(entry, partId);
            entry.setRegisteredBy(userToRegister);
            return registrationEntryService.saveAndFlush(entry);
        } else if (entry != null) {
            throw new ApplicationException(ApplicationError.UserAlreadyRegistered);
        }

        entry = new RegistrationEntry();
        entry.setPart(part);
        entry.setUser(userToRegister);
        entry.setRegisteredBy(userService.findById(authenticatedUser.getId()));
        userToRegister.setRoomNumber(part.getTitle());
        return registrationEntryService.saveAndFlush(entry);
    }

    private void changeRegistration(RegistrationEntry entry, UUID newPartId) {
        var part = registrationPartService.findById(newPartId);
        if(part == null) {
            throw new ApplicationException(ApplicationError.RegistrationPartNotFound);
        }
        entry.setPart(part);
    }

    @Transactional
    public void removeEntry(UUID entryId) {
        var entry = registrationEntryService.findById(entryId);
        if(entry == null) {
            throw new ApplicationException(ApplicationError.RegistrationPartNotFound);
        }
        var authenticatedUserId = securityFacade.getAuthenticatedUserReference().getId();
        var lock = entry.getPart().getLock();
        if(lock != null && !lock.getOwnerId().equals(authenticatedUserId)) {
            throw new ApplicationException(ApplicationError.RegistrationPartLocked);
        }
        if(!(entry.getRegisteredById().equals(authenticatedUserId) || entry.getUserId().equals(authenticatedUserId))) {
            throw new IllegalArgumentException(String.format("Entry with ID '%s' can't be removed by this user.", entryId));
        }
        var user = entry.getUser();
        user.setRoomNumber(null);
        user = userService.saveAndFlush(user);
        registrationEntryService.delete(entry);
    }

    @Transactional
    public void releaseLock(UUID partId) {
        var lock = registrationLockService.findByPartId(partId);
        if(lock == null) {
            return;
        }
        var authenticatedUser = securityFacade.getAuthenticatedUserReference();
        if(!lock.getOwnerId().equals(authenticatedUser.getId())) {
            throw new IllegalArgumentException(String.format("Can't release lock with ID '%s', because it doesn't belong to authenticated user", lock.getId()));
        }

        registrationLockService.delete(lock);
    }

    @Transactional
    public RegistrationLock createLock(UUID partId) {
        var authenticatedUser = securityFacade.getAuthenticatedUserReference();

        var userLock = registrationLockService.findByOwnerId(authenticatedUser.getId());
        if(userLock != null && !userLock.getPartId().equals(partId)) {
            throw new ApplicationException(ApplicationError.UserAlreadyOwnsALock);
        }
        var lock = registrationLockService.findByPartId(partId);
        if(lock != null && !lock.getOwnerId().equals(authenticatedUser.getId())) {
            throw new ApplicationException(ApplicationError.RegistrationPartLocked);
        }
        var part = registrationPartService.findById(partId);
        if(part == null) {
            throw new ApplicationException(ApplicationError.RegistrationPartNotFound);
        }
        if(lock != null) {
            refreshLock(lock, part);
        } else {
            lock = createRegistrationLock(userService.findById(authenticatedUser.getId()), part);
        }
        return registrationLockService.saveAndFlush(lock);
    }

    private void refreshLock(RegistrationLock lock, RegistrationPart part) {
        lock.setExpiresAt(getExpireTime(part));
    }

    private RegistrationLock createRegistrationLock(User owner, RegistrationPart part) {
        var lock = new RegistrationLock();
        lock.setExpiresAt(getExpireTime(part));
        lock.setPart(part);
        lock.setOwner(owner);
        return lock;
    }

    private LocalDateTime getExpireTime(RegistrationPart part) {
        var defaultDuration = part.getRegistration().getDefaultPartLockDuration();
        return clockService.getCurrentTime().plusSeconds(defaultDuration);
    }

    @Transactional
    public void sync() {
        securityFacade.checkAccess(Permission.RegistrationEdit);

        var entries = registrationEntryService.getAll();
        var iterator = entries.iterator();
        while(iterator.hasNext()) {
            var entry = iterator.next();
            var user = entry.getUser();
            user.setRoomNumber(entry.getPart().getTitle());
            user = userService.saveAndFlush(user);
        }

    }
}
