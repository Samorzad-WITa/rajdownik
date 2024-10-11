package pl.pwr.ite.server.service.impl;

import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.registration.activity.ActivityEntryUser;
import pl.pwr.ite.server.model.filter.ActivityEntryUserFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;
import pl.pwr.ite.server.model.repository.ActivityEntryUserRepository;
import pl.pwr.ite.server.service.ActivityEntryUserService;

@Service
public class ActivityEntryUserServiceImpl extends FilterableEntityServiceBase<ActivityEntryUser, ActivityEntryUserFilter> implements ActivityEntryUserService {

    public ActivityEntryUserServiceImpl(ActivityEntryUserRepository repository) {
        super(repository);
    }
}
