package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.registration.activity.ActivityRegistration;
import pl.pwr.ite.server.model.filter.ActivityRegistrationFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;

public interface ActivityRegistrationService extends FilterableEntityService<ActivityRegistration, ActivityRegistrationFilter> {
}
