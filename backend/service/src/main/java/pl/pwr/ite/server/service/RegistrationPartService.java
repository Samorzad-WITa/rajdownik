package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.registration.RegistrationPart;
import pl.pwr.ite.server.model.filter.RegistrationPartFilter;

import java.util.UUID;

public interface RegistrationPartService extends FilterableEntityService<RegistrationPart, RegistrationPartFilter> {

    Long getRegisteredEntriesAmount(UUID partId);
}
