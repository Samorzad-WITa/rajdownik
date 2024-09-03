package pl.pwr.ite.server.admin.web.service;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.admin.web.dto.RegistrationLockDto;
import pl.pwr.ite.server.admin.web.mapper.RegistrationLockMapper;
import pl.pwr.ite.server.model.entity.registration.RegistrationLock;
import pl.pwr.ite.server.model.filter.RegistrationLockFilter;
import pl.pwr.ite.server.service.RegistrationLockService;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;

@Component
public class RegistrationLockFacade extends EntityServiceFacade<RegistrationLock, RegistrationLockFilter, RegistrationLockService, RegistrationLockDto, RegistrationLockDto.Properties, RegistrationLockMapper> {

    public RegistrationLockFacade(RegistrationLockService service, RegistrationLockMapper mapper, SecurityFacade securityFacade) {
        super(service, mapper, securityFacade);
    }
}
