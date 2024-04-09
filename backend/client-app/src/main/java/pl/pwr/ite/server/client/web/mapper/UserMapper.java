package pl.pwr.ite.server.client.web.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.UserDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.User;

@Component
@RequiredArgsConstructor
public class UserMapper extends MapperBase<User, UserDto, UserDto.Properties> {

    private final UserDataMapper userDataMapper;

    @Override
    public void transform(User source, UserDto destination, UserDto.Properties properties) {
        destination.setPhoneNumber(source.getPhoneNumber());
        destination.setFirstName(source.getFirstName());
        destination.setLastName(source.getLastName());

        if(properties.isIncludeDetails()) {
            destination.setEmail(source.getEmail());
            destination.setIndexNumber(source.getIndexNumber());
            destination.setRoomNumber(source.getRoomNumber());
            destination.setDietType(source.getDietType());
            destination.setBusNumber(source.getBusNumber());
        }

//        if(properties.isIncludeData()) {
//            map(destination::setData, source.getData(), userDataMapper, properties);
//        }
    }
}
