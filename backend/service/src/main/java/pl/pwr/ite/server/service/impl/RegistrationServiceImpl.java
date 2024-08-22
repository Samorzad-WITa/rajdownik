package pl.pwr.ite.server.service.impl;

import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.registration.Registration;
import pl.pwr.ite.server.model.filter.RegistrationFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;
import pl.pwr.ite.server.model.repository.RegistrationRepository;
import pl.pwr.ite.server.service.RegistrationService;

@Service
public class RegistrationServiceImpl extends FilterableEntityServiceBase<Registration, RegistrationFilter> implements RegistrationService {

    public RegistrationServiceImpl(RegistrationRepository repository) {
        super(repository);
    }
}
