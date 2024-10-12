package pl.pwr.ite.server.service.impl;

import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.registration.QRegistrationEntry;
import pl.pwr.ite.server.model.entity.registration.RegistrationEntry;
import pl.pwr.ite.server.model.filter.RegistrationEntryFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;
import pl.pwr.ite.server.model.repository.RegistrationEntryRepository;
import pl.pwr.ite.server.service.RegistrationEntryService;

import java.util.UUID;

@Service
public class RegistrationEntryServiceImpl extends FilterableEntityServiceBase<RegistrationEntry, RegistrationEntryFilter> implements RegistrationEntryService {

    public RegistrationEntryServiceImpl(RegistrationEntryRepository repository) {
        super(repository);
    }

    @Override
    public RegistrationEntry findByUserId(UUID userId) {
        var path = QRegistrationEntry.registrationEntry;
        return createQuery()
                .from(path).select(path)
                .where(path.userId.eq(userId))
                .fetchOne();
    }
}
