package pl.pwr.ite.server.client.web.service;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.ActivityRegistrationDto;
import pl.pwr.ite.server.client.web.mapper.ActivityRegistrationMapper;
import pl.pwr.ite.server.model.entity.registration.activity.ActivityRegistration;
import pl.pwr.ite.server.model.filter.ActivityRegistrationFilter;
import pl.pwr.ite.server.service.ActivityRegistrationService;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;

@Component
public class ActivityRegistrationFacade extends EntityServiceFacade<ActivityRegistration, ActivityRegistrationFilter, ActivityRegistrationService, ActivityRegistrationDto, ActivityRegistrationDto.Properties, ActivityRegistrationMapper> {

    public ActivityRegistrationFacade(ActivityRegistrationService service, ActivityRegistrationMapper mapper, SecurityFacade securityFacade) {
        super(service, mapper, securityFacade);
    }
}
