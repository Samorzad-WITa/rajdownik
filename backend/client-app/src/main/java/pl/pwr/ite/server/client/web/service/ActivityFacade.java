package pl.pwr.ite.server.client.web.service;

import org.springframework.stereotype.Service;
import pl.pwr.ite.server.client.web.dto.ActivityDto;
import pl.pwr.ite.server.client.web.mapper.ActivityMapper;
import pl.pwr.ite.server.model.entity.Activity;
import pl.pwr.ite.server.model.filter.ActivityFilter;
import pl.pwr.ite.server.service.ActivityService;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;

@Service
public class ActivityFacade extends EntityServiceFacade<Activity, ActivityFilter, ActivityService, ActivityDto, ActivityDto.Properties, ActivityMapper> {
    public ActivityFacade(ActivityService service, ActivityMapper mapper, SecurityFacade securityFacade) {
        super(service, mapper, securityFacade);
    }
}
