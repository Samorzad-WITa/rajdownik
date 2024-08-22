package pl.pwr.ite.server.model.repository;

import pl.pwr.ite.server.model.entity.registration.Registration;
import pl.pwr.ite.server.model.filter.RegistrationFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;

public interface RegistrationRepository extends FilterableRepository<Registration, RegistrationFilter> {
}
