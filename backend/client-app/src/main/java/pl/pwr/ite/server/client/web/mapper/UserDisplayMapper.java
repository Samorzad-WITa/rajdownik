package pl.pwr.ite.server.client.web.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.UserDisplayDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.UserDisplay;

@Component
@RequiredArgsConstructor
public class UserDisplayMapper extends MapperBase<UserDisplay, UserDisplayDto, UserDisplayDto.Properties> {

    private final UserMapper userMapper;

    @Override
    public void transform(UserDisplay source, UserDisplayDto destination, UserDisplayDto.Properties properties) {
        destination.setLabel(source.getLabel());

        if(properties.isIncludeUser()) {
            map(destination::setUser, source.getUser(), userMapper, properties);
        }
    }
}
