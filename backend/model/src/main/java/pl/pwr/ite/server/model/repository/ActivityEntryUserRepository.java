package pl.pwr.ite.server.model.repository;

import pl.pwr.ite.server.model.entity.registration.activity.ActivityEntryUser;
import pl.pwr.ite.server.model.filter.ActivityEntryUserFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;

public interface ActivityEntryUserRepository extends FilterableRepository<ActivityEntryUser, ActivityEntryUserFilter> {
}
