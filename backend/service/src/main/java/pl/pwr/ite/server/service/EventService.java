package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.Event;
import pl.pwr.ite.server.model.filter.EventFilter;

public interface EventService extends FilterableEntityService<Event, EventFilter> {
}
