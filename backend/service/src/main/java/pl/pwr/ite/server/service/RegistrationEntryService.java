package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.registration.Registration;
import pl.pwr.ite.server.model.entity.registration.RegistrationEntry;
import pl.pwr.ite.server.model.filter.RegistrationEntryFilter;
import pl.pwr.ite.server.model.filter.RegistrationFilter;

public interface RegistrationEntryService extends FilterableEntityService<RegistrationEntry, RegistrationEntryFilter> {
}
