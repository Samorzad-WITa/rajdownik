package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.registration.Registration;
import pl.pwr.ite.server.model.filter.RegistrationFilter;

import java.util.UUID;

public interface RegistrationService extends FilterableEntityService<Registration, RegistrationFilter> {

    Registration getActive();
    boolean hasLockOnRegistration(UUID registrationId, UUID userId);
}
