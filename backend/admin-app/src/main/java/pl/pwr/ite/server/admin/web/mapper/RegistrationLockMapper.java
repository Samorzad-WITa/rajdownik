package pl.pwr.ite.server.admin.web.mapper;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.admin.web.dto.RegistrationLockDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.registration.RegistrationLock;

@Component
public class RegistrationLockMapper extends MapperBase<RegistrationLock, RegistrationLockDto, RegistrationLockDto.Properties> {

    @Override
    public void transform(RegistrationLock source, RegistrationLockDto destination, RegistrationLockDto.Properties properties) {

    }
}
