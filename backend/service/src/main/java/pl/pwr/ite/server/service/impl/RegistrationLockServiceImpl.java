package pl.pwr.ite.server.service.impl;

import lombok.NonNull;
import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.model.entity.registration.QRegistrationLock;
import pl.pwr.ite.server.model.entity.registration.RegistrationLock;
import pl.pwr.ite.server.model.entity.registration.RegistrationPart;
import pl.pwr.ite.server.model.filter.RegistrationLockFilter;
import pl.pwr.ite.server.model.repository.RegistrationLockRepository;
import pl.pwr.ite.server.service.ClockService;
import pl.pwr.ite.server.service.RegistrationLockService;
import pl.pwr.ite.server.service.RegistrationPartService;

import java.util.UUID;

@Service
public class RegistrationLockServiceImpl extends FilterableEntityServiceBase<RegistrationLock, RegistrationLockFilter> implements RegistrationLockService {

    public RegistrationLockServiceImpl(RegistrationLockRepository repository) {
        super(repository);
    }

    @Override
    public RegistrationLock findByPartId(UUID partId) {
        var path = QRegistrationLock.registrationLock;
        return createQuery().from(path).select(path)
                .where(path.partId.eq(partId))
                .fetchOne();
    }
}
