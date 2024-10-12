package pl.pwr.ite.server.client.web.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.ActivityEntryDto;
import pl.pwr.ite.server.client.web.mapper.ActivityEntryMapper;
import pl.pwr.ite.server.model.entity.registration.activity.ActivityEntry;
import pl.pwr.ite.server.model.entity.registration.activity.ActivityEntryUser;
import pl.pwr.ite.server.model.filter.ActivityEntryFilter;
import pl.pwr.ite.server.service.ActivityEntryService;
import pl.pwr.ite.server.service.ActivityEntryUserService;
import pl.pwr.ite.server.service.ActivityRegistrationService;
import pl.pwr.ite.server.service.UserService;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;
import pl.pwr.ite.server.web.exception.ApplicationError;
import pl.pwr.ite.server.web.exception.ApplicationException;

import java.util.UUID;

@Component
public class ActivityEntryFacade extends EntityServiceFacade<ActivityEntry, ActivityEntryFilter, ActivityEntryService, ActivityEntryDto, ActivityEntryDto.Properties, ActivityEntryMapper> {

    private final UserService userService;
    private final ActivityEntryUserService activityEntryUserService;
    private final ActivityRegistrationService activityRegistrationService;

    public ActivityEntryFacade(ActivityEntryService service, ActivityEntryMapper mapper, SecurityFacade securityFacade, UserService userService, ActivityEntryUserService activityEntryUserService, ActivityRegistrationService activityRegistrationService) {
        super(service, mapper, securityFacade);
        this.userService = userService;
        this.activityEntryUserService = activityEntryUserService;
        this.activityRegistrationService = activityRegistrationService;
    }

    @Transactional
    public ActivityEntry getByRegistrationAndUserId(UUID activityRegistrationId) {
        var authenticatedUser = securityFacade.getAuthenticatedUserReference();

        return getService().findRegisteredActivityEntry(activityRegistrationId, authenticatedUser.getId());
    }

    @Transactional
    public ActivityEntry create(UUID activityRegistrationId, ActivityEntryDto dto) {
        var activityRegistration = activityRegistrationService.findById(activityRegistrationId);
        if(activityRegistration == null) {
            throw new ApplicationException(ApplicationError.ActivityRegistrationNotFound);
        }
        if(getService().existByTeamName(activityRegistrationId, dto.getTeamName())) {
            throw new ApplicationException(ApplicationError.TeamNameAlreadyTaken);
        }

        var activityEntry = new ActivityEntry();
        activityEntry.setTeamName(dto.getTeamName());
        activityEntry.setActivityRegistration(activityRegistration);

        var teamCaptain = userService.findByCode(dto.getTeamCaptain().getCode());
        if(teamCaptain == null) {
            throw new ApplicationException(ApplicationError.UserNotFound);
        }
        activityEntry.setTeamCaptain(teamCaptain);

        activityEntry = saveAndFlush(activityEntry);
        for(var userDto : dto.getUsers()) {
            var user = userService.findById(userDto.getUser().getId());
            if(user == null) {
                throw new ApplicationException(ApplicationError.UserNotFound);
            }
            if(getService().findRegisteredActivityEntry(activityRegistrationId, user.getId()) != null) {
                throw new ApplicationException(ApplicationError.UserAlreadyRegistered);
            }
            var activityEntryUser = new ActivityEntryUser();
            activityEntryUser.setUser(user);
            activityEntryUser.setActivityEntry(activityEntry);
            activityEntryUser = activityEntryUserService.saveAndFlush(activityEntryUser);
        }

        var captainEntry = new ActivityEntryUser();
        captainEntry.setUser(teamCaptain);
        captainEntry.setActivityEntry(activityEntry);
        captainEntry = activityEntryUserService.saveAndFlush(captainEntry);

        return saveAndFlush(activityEntry);
    }
}
