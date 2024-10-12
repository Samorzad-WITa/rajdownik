package pl.pwr.ite.server.model.repository;

import pl.pwr.ite.server.model.entity.registration.RegistrationLock;
import pl.pwr.ite.server.model.filter.RegistrationLockFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;

public interface RegistrationLockRepository extends FilterableRepository<RegistrationLock, RegistrationLockFilter> {
}
