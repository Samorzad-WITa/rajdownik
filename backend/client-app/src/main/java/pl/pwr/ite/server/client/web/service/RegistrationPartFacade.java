package pl.pwr.ite.server.client.web.service;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.RegistrationPartDto;
import pl.pwr.ite.server.client.web.mapper.RegistrationPartMapper;
import pl.pwr.ite.server.model.entity.registration.RegistrationPart;
import pl.pwr.ite.server.model.filter.RegistrationPartFilter;
import pl.pwr.ite.server.service.RegistrationPartService;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;

@Component
public class RegistrationPartFacade extends EntityServiceFacade<RegistrationPart, RegistrationPartFilter, RegistrationPartService, RegistrationPartDto, RegistrationPartDto.Properties, RegistrationPartMapper> {

    public RegistrationPartFacade(RegistrationPartService service, RegistrationPartMapper mapper, SecurityFacade securityFacade) {
        super(service, mapper, securityFacade);
    }
}
