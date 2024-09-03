package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.model.entity.registration.RegistrationLock;
import pl.pwr.ite.server.model.entity.registration.RegistrationPart;
import pl.pwr.ite.server.model.filter.RegistrationLockFilter;

import java.util.UUID;

public interface RegistrationLockService extends FilterableEntityService<RegistrationLock, RegistrationLockFilter> {

    RegistrationLock findByPartId(UUID partId);
}
