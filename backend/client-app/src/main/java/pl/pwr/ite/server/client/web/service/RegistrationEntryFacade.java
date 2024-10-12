package pl.pwr.ite.server.client.web.service;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.RegistrationEntryDto;
import pl.pwr.ite.server.client.web.mapper.RegistrationEntryMapper;
import pl.pwr.ite.server.model.entity.registration.RegistrationEntry;
import pl.pwr.ite.server.model.filter.RegistrationEntryFilter;
import pl.pwr.ite.server.service.RegistrationEntryService;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;

@Component
public class RegistrationEntryFacade extends EntityServiceFacade<RegistrationEntry, RegistrationEntryFilter, RegistrationEntryService, RegistrationEntryDto, RegistrationEntryDto.Properties, RegistrationEntryMapper> {

    public RegistrationEntryFacade(RegistrationEntryService service, RegistrationEntryMapper mapper, SecurityFacade securityFacade) {
        super(service, mapper, securityFacade);
    }
}
