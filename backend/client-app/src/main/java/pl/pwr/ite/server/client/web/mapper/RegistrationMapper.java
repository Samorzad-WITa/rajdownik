package pl.pwr.ite.server.client.web.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.RegistrationDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.registration.Registration;

@Component
@RequiredArgsConstructor
public class RegistrationMapper extends MapperBase<Registration, RegistrationDto, RegistrationDto.Properties> {

    private final RegistrationPartMapper registrationPartMapper;

    @Override
    public void transform(Registration source, RegistrationDto destination, RegistrationDto.Properties properties) {
        destination.setTitle(source.getTitle());
        destination.setStartTime(source.getStartTime());

        if(properties.isIncludeParts()) {
            map(destination::setParts, source.getParts(), registrationPartMapper, properties);
        }
    }
}
