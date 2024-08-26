package pl.pwr.ite.server.client.web.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.RegistrationEntryDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.registration.RegistrationEntry;

@Component
@RequiredArgsConstructor
public class RegistrationEntryMapper extends MapperBase<RegistrationEntry, RegistrationEntryDto, RegistrationEntryDto.Properties> {

    private final RegistrationPartMapper registrationPartMapper;
    private final UserMapper userMapper;

    @Override
    public void transform(RegistrationEntry source, RegistrationEntryDto destination, RegistrationEntryDto.Properties properties) {
        destination.setFirstName(source.getFirstName());
        destination.setLastName(source.getLastName());

        if(properties.isIncludePart()) {
            map(destination::setPart, source.getPart(), registrationPartMapper, properties);
        }
        if(properties.isIncludeUser()) {
            map(destination::setUser, source.getUser(), userMapper, properties);
        }
    }
}
