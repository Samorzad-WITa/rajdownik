package pl.pwr.ite.server.service.impl;

import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.registration.activity.ActivityRegistration;
import pl.pwr.ite.server.model.filter.ActivityRegistrationFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;
import pl.pwr.ite.server.model.repository.ActivityRegistrationRepository;
import pl.pwr.ite.server.service.ActivityRegistrationService;

@Service
public class ActivityRegistrationServiceImpl extends FilterableEntityServiceBase<ActivityRegistration, ActivityRegistrationFilter> implements ActivityRegistrationService {

    public ActivityRegistrationServiceImpl(ActivityRegistrationRepository repository) {
        super(repository);
    }
}
