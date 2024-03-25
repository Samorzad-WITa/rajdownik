package pl.pwr.ite.server.client.web.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.UserDataDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.UserData;

@Component
@RequiredArgsConstructor
public class UserDataMapper extends MapperBase<UserData, UserDataDto, UserDataDto.Properties> {

    @Lazy
    private final UserMapper userMapper;

    private final DataMapper dataMapper;

    @Override
    public void transform(UserData source, UserDataDto destination, UserDataDto.Properties properties) {
        destination.setValue(source.getValue());

        if(properties.isIncludeData()) {
            map(destination::setData, source.getData(), dataMapper, properties);
        }
        if(properties.isIncludeUser()) {
            map(destination::setUser, source.getUser(), userMapper, properties);
        }
    }
}
