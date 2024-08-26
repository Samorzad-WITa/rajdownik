package pl.pwr.ite.server.client.web.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.RegistrationPartDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.registration.RegistrationPart;

@Component
@RequiredArgsConstructor
public class RegistrationPartMapper extends MapperBase<RegistrationPart, RegistrationPartDto, RegistrationPartDto.Properties> {

    @Lazy
    private final RegistrationMapper registrationMapper;
    private final RegistrationLockMapper registrationLockMapper;
    private final RegistrationEntryMapper registrationEntryMapper;

    @Override
    public void transform(RegistrationPart source, RegistrationPartDto destination, RegistrationPartDto.Properties properties) {
        destination.setTitle(source.getTitle());
        destination.setEntryLimit(source.getEntryLimit());

        if(properties.isIncludeEntries()) {
            map(destination::setEntries, source.getEntries(), registrationEntryMapper, properties);
        }
        if(properties.isIncludeRegistration()) {
            map(destination::setRegistration, source.getRegistration(), registrationMapper, properties);
        }
        if(properties.isIncludeLock()) {
            map(destination::setLock, source.getLock(), registrationLockMapper, properties);
        }
    }
}
