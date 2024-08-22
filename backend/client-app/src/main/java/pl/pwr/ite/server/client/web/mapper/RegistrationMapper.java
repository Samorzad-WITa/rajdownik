package pl.pwr.ite.server.client.web.mapper;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.RegistrationDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.registration.Registration;

@Component
public class RegistrationMapper extends MapperBase<Registration, RegistrationDto, RegistrationDto.Properties> {

    @Override
    public void transform(Registration source, RegistrationDto destination, RegistrationDto.Properties properties) {

    }
}
