package pl.pwr.ite.server.model.repository;

import pl.pwr.ite.server.model.entity.registration.RegistrationPart;
import pl.pwr.ite.server.model.filter.RegistrationPartFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;

public interface RegistrationPartRepository extends FilterableRepository<RegistrationPart, RegistrationPartFilter> {
}
