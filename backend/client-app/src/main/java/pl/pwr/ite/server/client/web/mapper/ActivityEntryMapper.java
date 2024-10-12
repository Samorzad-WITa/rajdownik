package pl.pwr.ite.server.client.web.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.ActivityEntryDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.registration.activity.ActivityEntry;

@Component
@RequiredArgsConstructor
public class ActivityEntryMapper extends MapperBase<ActivityEntry, ActivityEntryDto, ActivityEntryDto.Properties> {

    @Lazy private final ActivityRegistrationMapper activityRegistrationMapper;
    @Lazy private final ActivityEntryUserMapper activityEntryUserMapper;
    @Lazy private final UserMapper userMapper;

    @Override
    public void transform(ActivityEntry source, ActivityEntryDto destination, ActivityEntryDto.Properties properties) {
        destination.setTeamName(source.getTeamName());

        if(properties.isIncludeTeamCaptain()) {
            map(destination::setTeamCaptain, source.getTeamCaptain(), userMapper, properties);
        }
        if(properties.isIncludeActivityRegistration()) {
            map(destination::setActivityRegistration, source.getActivityRegistration(), activityRegistrationMapper, properties);
        }
        if(properties.isIncludeUsers()) {
            map(destination::setUsers, source.getUsers(), activityEntryUserMapper, properties);
        }
    }
}
