package pl.pwr.ite.server.admin.web.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.admin.web.dto.RegistrationDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.registration.Registration;

@Component
@RequiredArgsConstructor
public class RegistrationMapper extends MapperBase<Registration, RegistrationDto, RegistrationDto.Properties> {

    @Lazy
    private final RegistrationPartMapper registrationPartMapper;


    @Override
    public void transform(Registration source, RegistrationDto destination, RegistrationDto.Properties properties) {
        destination.setId(source.getId());
        destination.setTitle(source.getTitle());
        destination.setStartTime(source.getStartTime());
        destination.setActive(source.getActive());

        if(properties.isIncludeParts()) {
            map(destination::setParts, source.getParts(), registrationPartMapper, properties);
        }
    }
}
