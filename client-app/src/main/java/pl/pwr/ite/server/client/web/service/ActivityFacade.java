package pl.pwr.ite.server.client.web.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import pl.pwr.ite.server.client.web.dto.ActivityDto;
import pl.pwr.ite.server.client.web.mapper.ActivityMapper;
import pl.pwr.ite.server.model.entity.Activity;
import pl.pwr.ite.server.model.filter.ActivityFilter;
import pl.pwr.ite.server.service.ActivityService;
import pl.pwr.ite.server.web.EntityServiceFacade;

import java.util.Collection;
import java.util.Collections;

@Service
public class ActivityFacade extends EntityServiceFacade<Activity, ActivityService, ActivityDto, ActivityDto.Properties, ActivityMapper> {
    public ActivityFacade(ActivityService service, ActivityMapper mapper) {
        super(service, mapper);
    }

    @Transactional
    public Collection<Activity> getAll(ActivityFilter filter) {
        return getService().getAllByDate(filter.getTime());
    }
}
