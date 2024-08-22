package pl.pwr.ite.server.client.web.mapper;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.RegistrationPartDto;
import pl.pwr.ite.server.mapping.Mapper;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.registration.RegistrationPart;

@Component
public class RegistrationPartMapper extends MapperBase<RegistrationPart, RegistrationPartDto, RegistrationPartDto.Properties> {

    @Override
    public void transform(RegistrationPart source, RegistrationPartDto destination, RegistrationPartDto.Properties properties) {

    }
}
