package pl.pwr.ite.server.client.web.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.ActivityEntryDto;
import pl.pwr.ite.server.client.web.dto.ActivityRegistrationDto;
import pl.pwr.ite.server.client.web.mapper.ActivityRegistrationMapper;
import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.model.entity.registration.activity.ActivityEntry;
import pl.pwr.ite.server.model.entity.registration.activity.ActivityRegistration;
import pl.pwr.ite.server.model.filter.ActivityRegistrationFilter;
import pl.pwr.ite.server.service.ActivityEntryService;
import pl.pwr.ite.server.service.ActivityRegistrationService;
import pl.pwr.ite.server.service.UserService;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;
import pl.pwr.ite.server.web.exception.ApplicationError;
import pl.pwr.ite.server.web.exception.ApplicationException;

import java.util.UUID;

@Component
public class ActivityRegistrationFacade extends EntityServiceFacade<ActivityRegistration, ActivityRegistrationFilter, ActivityRegistrationService, ActivityRegistrationDto, ActivityRegistrationDto.Properties, ActivityRegistrationMapper> {

    private final UserService userService;
    private final ActivityEntryService activityEntryService;

    public ActivityRegistrationFacade(ActivityRegistrationService service, ActivityRegistrationMapper mapper, SecurityFacade securityFacade, UserService userService, ActivityEntryService activityEntryService) {
        super(service, mapper, securityFacade);
        this.userService = userService;
        this.activityEntryService = activityEntryService;
    }

    @Transactional
    public User validateEntry(UUID registrationId, String userCode) {
        var activityRegistration = getById(registrationId);
        if(activityRegistration == null) {
            throw new ApplicationException(ApplicationError.ActivityRegistrationNotFound);
        }
        var user = userService.findByCode(userCode);
        if(user == null) {
            throw new ApplicationException(ApplicationError.UserNotFound);
        }
        var registrationEntry = activityEntryService.findRegisteredActivityEntry(registrationId, user.getId());
        if(registrationEntry != null) {
            throw new ApplicationException(ApplicationError.UserAlreadyRegistered);
        }

        return user;
    }
}
