package pl.pwr.ite.server.service.impl;

import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.registration.RegistrationLock;
import pl.pwr.ite.server.model.filter.RegistrationLockFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;
import pl.pwr.ite.server.model.repository.RegistrationLockRepository;
import pl.pwr.ite.server.service.RegistrationLockService;

@Service
public class RegistrationLockServiceImpl extends FilterableEntityServiceBase<RegistrationLock, RegistrationLockFilter> implements RegistrationLockService {

    public RegistrationLockServiceImpl(RegistrationLockRepository repository) {
        super(repository);
    }
}
