package pl.pwr.ite.server.admin.web.mapper;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.admin.web.dto.RegistrationEntryDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.registration.RegistrationEntry;

@Component
public class RegistrationEntryMapper extends MapperBase<RegistrationEntry, RegistrationEntryDto, RegistrationEntryDto.Properties> {

    @Override
    public void transform(RegistrationEntry source, RegistrationEntryDto destination, RegistrationEntryDto.Properties properties) {

    }
}
