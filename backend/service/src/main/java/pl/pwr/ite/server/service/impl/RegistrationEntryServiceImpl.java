package pl.pwr.ite.server.service.impl;

import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.registration.RegistrationEntry;
import pl.pwr.ite.server.model.filter.RegistrationEntryFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;
import pl.pwr.ite.server.model.repository.RegistrationEntryRepository;
import pl.pwr.ite.server.service.RegistrationEntryService;

@Service
public class RegistrationEntryServiceImpl extends FilterableEntityServiceBase<RegistrationEntry, RegistrationEntryFilter> implements RegistrationEntryService {

    public RegistrationEntryServiceImpl(RegistrationEntryRepository repository) {
        super(repository);
    }
}
