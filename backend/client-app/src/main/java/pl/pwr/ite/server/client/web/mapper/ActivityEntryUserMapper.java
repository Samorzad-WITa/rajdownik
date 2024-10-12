package pl.pwr.ite.server.client.web.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.ActivityEntryUserDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.registration.activity.ActivityEntryUser;

@Component
@RequiredArgsConstructor
public class ActivityEntryUserMapper extends MapperBase<ActivityEntryUser, ActivityEntryUserDto, ActivityEntryUserDto.Properties> {

    @Lazy
    private final ActivityEntryMapper activityEntryMapper;

    private final UserMapper userMapper;

    @Override
    public void transform(ActivityEntryUser source, ActivityEntryUserDto destination, ActivityEntryUserDto.Properties properties) {

        if(properties.isIncludeActivityEntry()) {
            map(destination::setActivityEntry, source.getActivityEntry(), activityEntryMapper, properties);
        }
        if(properties.isIncludeUser()) {
            map(destination::setUser, source.getUser(), userMapper, properties);
        }
    }
}
