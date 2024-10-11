package pl.pwr.ite.server.model.repository;

import pl.pwr.ite.server.model.entity.registration.activity.ActivityRegistration;
import pl.pwr.ite.server.model.filter.ActivityRegistrationFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;

public interface ActivityRegistrationRepository extends FilterableRepository<ActivityRegistration, ActivityRegistrationFilter> {
}
