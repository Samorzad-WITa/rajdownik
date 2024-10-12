package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.model.entity.registration.RegistrationLock;
import pl.pwr.ite.server.model.entity.registration.RegistrationPart;
import pl.pwr.ite.server.model.filter.RegistrationLockFilter;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

public interface RegistrationLockService extends FilterableEntityService<RegistrationLock, RegistrationLockFilter> {

    RegistrationLock findByPartId(UUID partId);
    RegistrationLock findByOwnerId(UUID ownerId);
    List<RegistrationLock> getAllInOngoingRegistration(LocalDateTime referenceTime);
}
