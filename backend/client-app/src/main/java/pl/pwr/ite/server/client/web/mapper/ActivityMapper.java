package pl.pwr.ite.server.client.web.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.ActivityDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.Activity;

@Component
@RequiredArgsConstructor
public class ActivityMapper extends MapperBase<Activity, ActivityDto, ActivityDto.Properties> {

    private final ActivityRegistrationMapper activityRegistrationMapper;

    @Override
    public void transform(Activity source, ActivityDto destination, ActivityDto.Properties properties) {
        destination.setTimeFrom(source.getTimeFrom());
        destination.setTimeTo(source.getTimeTo());
        destination.setTitle(source.getTitle());
        destination.setLocation(source.getLocation());
        destination.setId(source.getId());
        destination.setDescription(source.getDescription());

        if(properties.isIncludeActivityRegistration()) {
            map(destination::setActivityRegistration, source.getActivityRegistration(), activityRegistrationMapper, properties);
        }
    }
}
