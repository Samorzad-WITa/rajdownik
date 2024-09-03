package pl.pwr.ite.server.admin.web.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.admin.web.dto.RegistrationPartDto;
import pl.pwr.ite.server.admin.web.mapper.RegistrationPartMapper;
import pl.pwr.ite.server.model.entity.registration.RegistrationPart;
import pl.pwr.ite.server.model.enums.Permission;
import pl.pwr.ite.server.model.filter.RegistrationPartFilter;
import pl.pwr.ite.server.service.RegistrationPartService;
import pl.pwr.ite.server.service.RegistrationService;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;
import pl.pwr.ite.server.web.exception.ApplicationError;
import pl.pwr.ite.server.web.exception.ApplicationException;

import java.util.UUID;

@Component
public class RegistrationPartFacade extends EntityServiceFacade<RegistrationPart, RegistrationPartFilter, RegistrationPartService, RegistrationPartDto, RegistrationPartDto.Properties, RegistrationPartMapper> {

    private final RegistrationService registrationService;

    public RegistrationPartFacade(RegistrationPartService service, RegistrationPartMapper mapper, SecurityFacade securityFacade, RegistrationService registrationService) {
        super(service, mapper, securityFacade);
        this.registrationService = registrationService;
    }

    @Transactional
    public RegistrationPart create(RegistrationPartDto dto) {
        var registrationPart = new RegistrationPart();

        var registration = registrationService.findById(dto.getRegistration().getId());
        if(registration == null) {
            throw new ApplicationException(ApplicationError.RegistrationNotFound);
        }
        registrationPart.setRegistration(registration);
        registrationPart.setEntryLimit(dto.getEntryLimit());
        registrationPart.setTitle(dto.getTitle());

        return saveAndFlush(registrationPart);
    }

    @Transactional
    public RegistrationPart update(UUID id, RegistrationPartDto dto) {
        var registrationPart = getById(id);
        if(registrationPart == null) {
            throw new ApplicationException(ApplicationError.RegistrationPartNotFound);
        }

        var registration = registrationService.findById(dto.getRegistration().getId());
        if(registration == null) {
            throw new ApplicationException(ApplicationError.RegistrationNotFound);
        }
        registrationPart.setRegistration(registration);
        registrationPart.setEntryLimit(dto.getEntryLimit());
        registrationPart.setTitle(dto.getTitle());

        return saveAndFlush(registrationPart);
    }

    @Transactional
    public void delete(UUID registrationPartId) {
        var registrationPart = getById(registrationPartId);
        if(registrationPart == null) {
            throw new ApplicationException(ApplicationError.RegistrationPartNotFound);
        }
        securityFacade.checkAccess(Permission.RegistrationPartEdit);
        getService().delete(registrationPart);
    }
}
