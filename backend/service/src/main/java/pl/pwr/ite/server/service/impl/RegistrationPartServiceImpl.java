package pl.pwr.ite.server.service.impl;

import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.registration.RegistrationPart;
import pl.pwr.ite.server.model.filter.RegistrationPartFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;
import pl.pwr.ite.server.model.repository.RegistrationPartRepository;
import pl.pwr.ite.server.service.RegistrationPartService;

@Service
public class RegistrationPartServiceImpl extends FilterableEntityServiceBase<RegistrationPart, RegistrationPartFilter> implements RegistrationPartService {

    public RegistrationPartServiceImpl(RegistrationPartRepository repository) {
        super(repository);
    }
}
