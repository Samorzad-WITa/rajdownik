package pl.pwr.ite.server.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.Event;
import pl.pwr.ite.server.model.repository.EventRepository;
import pl.pwr.ite.server.service.EventService;

import java.util.UUID;

@Service
public class EventServiceImpl extends EntityServiceBase<Event> implements EventService {

    public EventServiceImpl(EventRepository repository) {
        super(repository);
    }
}
