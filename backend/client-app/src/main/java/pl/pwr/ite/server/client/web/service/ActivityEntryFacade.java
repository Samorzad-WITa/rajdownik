package pl.pwr.ite.server.client.web.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.ActivityEntryDto;
import pl.pwr.ite.server.client.web.mapper.ActivityEntryMapper;
import pl.pwr.ite.server.model.entity.registration.activity.ActivityEntry;
import pl.pwr.ite.server.model.filter.ActivityEntryFilter;
import pl.pwr.ite.server.service.ActivityEntryService;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;

import java.util.UUID;

@Component
public class ActivityEntryFacade extends EntityServiceFacade<ActivityEntry, ActivityEntryFilter, ActivityEntryService, ActivityEntryDto, ActivityEntryDto.Properties, ActivityEntryMapper> {

    public ActivityEntryFacade(ActivityEntryService service, ActivityEntryMapper mapper, SecurityFacade securityFacade) {
        super(service, mapper, securityFacade);
    }

    @Transactional
    public ActivityEntry getByRegistrationAndUserId(UUID activityRegistrationId) {
        var authenticatedUser = securityFacade.getAuthenticatedUserReference();

        return getService().findRegisteredActivityEntry(activityRegistrationId, authenticatedUser.getId());
    }
}
