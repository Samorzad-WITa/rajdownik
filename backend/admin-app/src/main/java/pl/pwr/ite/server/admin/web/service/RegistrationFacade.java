package pl.pwr.ite.server.admin.web.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.admin.web.dto.RegistrationDto;
import pl.pwr.ite.server.admin.web.mapper.RegistrationMapper;
import pl.pwr.ite.server.model.entity.registration.Registration;
import pl.pwr.ite.server.model.entity.registration.RegistrationPart;
import pl.pwr.ite.server.model.filter.RegistrationFilter;
import pl.pwr.ite.server.service.RegistrationService;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;
import pl.pwr.ite.server.web.exception.ApplicationError;
import pl.pwr.ite.server.web.exception.ApplicationException;

import java.util.UUID;

@Component
public class RegistrationFacade extends EntityServiceFacade<Registration, RegistrationFilter, RegistrationService, RegistrationDto, RegistrationDto.Properties, RegistrationMapper> {

    public RegistrationFacade(RegistrationService service, RegistrationMapper mapper, SecurityFacade securityFacade) {
        super(service, mapper, securityFacade);
    }

    @Transactional
    public Registration create(RegistrationDto dto) {
        var registration = new Registration();
        registration.setTitle(dto.getTitle());
        registration.setActive(dto.getActive());
        registration.setStartTime(dto.getStartTime());

        return saveAndFlush(registration);
    }

    @Transactional
    public Registration update(UUID id, RegistrationDto dto) {
        var registration = getById(id);
        if(registration == null) {
            throw new ApplicationException(ApplicationError.RegistrationNotFound);
        }

        registration.setTitle(dto.getTitle());
        registration.setActive(dto.getActive());
        registration.setStartTime(dto.getStartTime());

        return saveAndFlush(registration);
    }
}
