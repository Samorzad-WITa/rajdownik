package pl.pwr.ite.server.admin.web.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.admin.web.dto.UserDisplayDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.UserDisplay;

@Component
@RequiredArgsConstructor
public class UserDisplayMapper extends MapperBase<UserDisplay, UserDisplayDto, UserDisplayDto.Properties> {

    private final UserMapper userMapper;

    @Override
    public void transform(UserDisplay source, UserDisplayDto destination, UserDisplayDto.Properties properties) {
        destination.setId(source.getId());
        destination.setLabel(source.getLabel());
        destination.setTimeFrom(source.getTimeFrom());
        destination.setTimeTo(source.getTimeTo());

        if(properties.isIncludeUser()) {
            map(destination::setUser, source.getUser(), userMapper, properties);
        }
    }
}
