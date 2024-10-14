package pl.pwr.ite.server.client.web.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.RegistrationPartDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.registration.RegistrationPart;
import pl.pwr.ite.server.service.UserService;
import pl.pwr.ite.server.web.SecurityFacade;

@Component
@RequiredArgsConstructor
public class RegistrationPartMapper extends MapperBase<RegistrationPart, RegistrationPartDto, RegistrationPartDto.Properties> {

    @Lazy
    private final RegistrationMapper registrationMapper;
    @Lazy
    private final RegistrationLockMapper registrationLockMapper;
    private final RegistrationEntryMapper registrationEntryMapper;
    private final SecurityFacade securityFacade;
    private final UserService userService;

    @Override
    public void transform(RegistrationPart source, RegistrationPartDto destination, RegistrationPartDto.Properties properties) {
        boolean isAdmin = userService.hasRoleByCodes(securityFacade.getAuthenticatedUserReference().getId(), "coo");

        destination.setId(source.getId());
        destination.setTitle(source.getTitle());
        destination.setEntryLimit(source.getEntryLimit());
        destination.setEntryAmount(source.getEntries().size());

        var isVisible = source.getVisible() || isAdmin;
        destination.setVisible(isVisible);

        destination.setLocked(source.getLock() != null);
        destination.setOwnsLock((source.getLock() != null && source.getLock().getOwnerId().equals(securityFacade.getAuthenticatedUserReference().getId())));

        if(properties.isIncludeEntries()) {
            map(destination::setEntries, source.getEntries(), registrationEntryMapper, properties);
        }
        if(properties.isIncludeRegistration()) {
            map(destination::setRegistration, source.getRegistration(), registrationMapper, properties);
        }
        if(properties.isIncludeLock()) {
            map(destination::setLock, source.getLock(), registrationLockMapper, properties);
        }
    }
}
