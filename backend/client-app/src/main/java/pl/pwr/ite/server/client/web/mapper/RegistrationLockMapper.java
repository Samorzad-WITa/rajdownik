package pl.pwr.ite.server.client.web.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.RegistrationLockDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.registration.RegistrationLock;

@Component
@RequiredArgsConstructor
public class RegistrationLockMapper extends MapperBase<RegistrationLock, RegistrationLockDto, RegistrationLockDto.Properties> {

    private final RegistrationPartMapper registrationPartMapper;
    private final UserMapper userMapper;

    @Override
    public void transform(RegistrationLock source, RegistrationLockDto destination, RegistrationLockDto.Properties properties) {
        destination.setExpiresAt(source.getExpiresAt());

        if(properties.isIncludePart()) {
            map(destination::setPart, source.getPart(), registrationPartMapper, properties);
        }
        if(properties.isIncludeOwner()) {
            map(destination::setOwner, source.getOwner(), userMapper, properties);
        }
    }
}
