package pl.pwr.ite.server.admin.web.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.admin.web.dto.EventDto;
import pl.pwr.ite.server.admin.web.mapper.EventMapper;
import pl.pwr.ite.server.model.entity.Event;
import pl.pwr.ite.server.service.EventService;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;

import java.util.UUID;

@Component
public class EventFacade extends EntityServiceFacade<Event, EventService, EventDto, EventDto.Properties, EventMapper> {

    public EventFacade(EventService service, EventMapper mapper, SecurityFacade securityFacade) {
        super(service, mapper, securityFacade);
    }

    @Transactional
    public Event create(EventDto dto) {
        var event = new Event();

        event.setTimeFrom(dto.getTimeFrom());
        event.setTimeTo(dto.getTimeTo());
        event.setTitle(dto.getTitle());

        return saveAndFlush(event);
    }

    @Transactional
    public Event update(UUID eventId, EventDto dto) {
        var event = getService().findById(eventId);
        if(event == null) {
            throw new IllegalArgumentException(String.format("Event with ID %s not found", eventId));
        }

        event.setTimeFrom(dto.getTimeFrom());
        event.setTimeTo(dto.getTimeTo());
        event.setTitle(dto.getTitle());

        return saveAndFlush(event);
    }
}
