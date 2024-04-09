package pl.pwr.ite.server.client.web.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import pl.pwr.ite.server.client.web.dto.ActivityDto;
import pl.pwr.ite.server.client.web.mapper.ActivityMapper;
import pl.pwr.ite.server.model.entity.Activity;
import pl.pwr.ite.server.model.enums.Permission;
import pl.pwr.ite.server.model.filter.ActivityFilter;
import pl.pwr.ite.server.service.ActivityService;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;
import pl.pwr.ite.server.web.exception.ApplicationError;
import pl.pwr.ite.server.web.exception.ApplicationException;

import java.util.Collection;
import java.util.UUID;

@Service
public class ActivityFacade extends EntityServiceFacade<Activity, ActivityService, ActivityDto, ActivityDto.Properties, ActivityMapper> {

    private final SecurityFacade securityFacade;

    public ActivityFacade(ActivityService service, ActivityMapper mapper, SecurityFacade securityFacade) {
        super(service, mapper);
        this.securityFacade = securityFacade;
    }

    @Transactional
    public Collection<Activity> getAll(/*ActivityFilter filter*/) {
        return getService().getAllByDate(/*filter.getTime()*/);
    }

    @Transactional
    public Activity create(ActivityDto dto) {
        securityFacade.checkAccess(Permission.ActivityEdit);

        var activity = new Activity();
        activity.setTitle(dto.getTitle());
        activity.setTimeFrom(dto.getTimeFrom());
        activity.setTimeTo(dto.getTimeTo());
        activity.setDescription(dto.getDescription());

        return saveAndFlush(activity);
    }

    @Transactional
    public Activity update(UUID id, ActivityDto dto) {
        var activity = getById(id);
        if(activity == null) {
            throw new ApplicationException(ApplicationError.ActivityNotFound);
        }
        securityFacade.checkAccess(Permission.ActivityEdit);

        activity.setTitle(dto.getTitle());
        activity.setTimeFrom(dto.getTimeFrom());
        activity.setTimeTo(dto.getTimeTo());
        activity.setDescription(dto.getDescription());

        return saveAndFlush(activity);
    }

    @Transactional
    public void delete(UUID id) {
        var activity = getById(id);
        if(activity == null) {
            throw new ApplicationException(ApplicationError.ActivityNotFound);
        }
        securityFacade.checkAccess(Permission.ActivityEdit);
        getService().deleteById(id);
    }
}
