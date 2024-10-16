package pl.pwr.ite.server.admin.web.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.admin.web.dto.ActivityDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.Activity;

@Component
@RequiredArgsConstructor
public class ActivityMapper extends MapperBase<Activity, ActivityDto, ActivityDto.Properties> {

    private final EventMapper eventMapper;

    @Override
    public void transform(Activity source, ActivityDto destination, ActivityDto.Properties properties) {
        destination.setId(source.getId());
        destination.setTimeFrom(source.getTimeFrom());
        destination.setTimeTo(source.getTimeTo());
        destination.setTitle(source.getTitle());
        destination.setDescription(source.getDescription());
        destination.setLocation(source.getLocation());
    }
}
