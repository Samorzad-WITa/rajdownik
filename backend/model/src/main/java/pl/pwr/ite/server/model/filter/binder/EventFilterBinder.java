package pl.pwr.ite.server.model.filter.binder;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.model.entity.Event;
import pl.pwr.ite.server.model.entity.QEvent;
import pl.pwr.ite.server.model.filter.EventFilter;

@Component
public class EventFilterBinder extends FilterBinderBase<Event, EventFilter, QEvent> {
}
