package pl.pwr.ite.server.admin.web.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.admin.web.dto.ActivityDto;
import pl.pwr.ite.server.admin.web.mapper.ActivityMapper;
import pl.pwr.ite.server.model.entity.Activity;
import pl.pwr.ite.server.service.ActivityService;
import pl.pwr.ite.server.service.EventService;
import pl.pwr.ite.server.web.EntityServiceFacade;

import java.util.UUID;

@Component
public class ActivityFacade extends EntityServiceFacade<Activity, ActivityService, ActivityDto, ActivityDto.Properties, ActivityMapper> {

    private final EventService eventService;

    public ActivityFacade(ActivityService service, ActivityMapper mapper, EventService eventService) {
        super(service, mapper);
        this.eventService = eventService;
    }

    @Transactional
    public Activity create(ActivityDto dto) {
        var activity = new Activity();

        var eventId = dto.getEvent().getId();
        var event = eventService.findById(eventId);
        if(event == null) {
            throw new IllegalArgumentException(String.format("Event with ID %s not found", eventId));
        }

        activity.setEvent(event);
        activity.setTimeFrom(dto.getTimeFrom());
        activity.setTimeTo(dto.getTimeTo());
        activity.setTitle(dto.getTitle());
        activity.setDescription(dto.getDescription());

        return saveAndFlush(activity);
    }

    @Transactional
    public Activity update(UUID activityId, ActivityDto dto) {
        var activity = getService().findById(activityId);
        if(activity == null) {
            throw new IllegalArgumentException(String.format("Activity with ID %s not found.", activityId));
        }

        activity.setTimeFrom(dto.getTimeFrom());
        activity.setTimeTo(dto.getTimeTo());
        activity.setTitle(dto.getTitle());
        activity.setDescription(dto.getDescription());

        return saveAndFlush(activity);
    }
}
