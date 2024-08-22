package pl.pwr.ite.server.client.web.service;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.RegistrationDto;
import pl.pwr.ite.server.client.web.mapper.RegistrationMapper;
import pl.pwr.ite.server.model.entity.registration.Registration;
import pl.pwr.ite.server.model.filter.RegistrationFilter;
import pl.pwr.ite.server.service.RegistrationService;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;

@Component
public class RegistrationFacade extends EntityServiceFacade<Registration, RegistrationFilter, RegistrationService, RegistrationDto, RegistrationDto.Properties, RegistrationMapper> {

    public RegistrationFacade(RegistrationService service, RegistrationMapper mapper, SecurityFacade securityFacade) {
        super(service, mapper, securityFacade);
    }
}
