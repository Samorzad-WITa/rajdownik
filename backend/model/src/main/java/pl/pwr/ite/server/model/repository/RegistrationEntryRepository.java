package pl.pwr.ite.server.model.repository;

import pl.pwr.ite.server.model.entity.registration.RegistrationEntry;
import pl.pwr.ite.server.model.filter.RegistrationEntryFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;

public interface RegistrationEntryRepository extends FilterableRepository<RegistrationEntry, RegistrationEntryFilter> {
}
