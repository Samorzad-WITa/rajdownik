package pl.pwr.ite.server.admin.web.mapper;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.admin.web.dto.EventDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.Event;

@Component
public class EventMapper extends MapperBase<Event, EventDto, EventDto.Properties> {

    @Override
    public void transform(Event source, EventDto destination, EventDto.Properties properties) {
        destination.setId(source.getId());
        destination.setTimeFrom(source.getTimeFrom());
        destination.setTimeTo(source.getTimeTo());
        destination.setTitle(source.getTitle());
    }
}
