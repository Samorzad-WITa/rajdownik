package pl.pwr.ite.server.client.web.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.UserDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.User;

@Component
@RequiredArgsConstructor
public class UserMapper extends MapperBase<User, UserDto, UserDto.Properties> {

    @Override
    public void transform(User source, UserDto destination, UserDto.Properties properties) {
        destination.setEmail(source.getEmail());
        destination.setPhoneNumber(source.getPhoneNumber());
        destination.setIndexNumber(source.getIndexNumber());
        destination.setFirstName(source.getFirstName());
        destination.setLastName(source.getLastName());
    }
}
