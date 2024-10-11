package pl.pwr.ite.server.model.repository;

import pl.pwr.ite.server.model.entity.registration.activity.ActivityEntry;
import pl.pwr.ite.server.model.filter.ActivityEntryFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;

public interface ActivityEntryRepository extends FilterableRepository<ActivityEntry, ActivityEntryFilter> {
}
