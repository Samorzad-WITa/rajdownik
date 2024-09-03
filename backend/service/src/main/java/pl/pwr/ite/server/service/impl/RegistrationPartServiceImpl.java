package pl.pwr.ite.server.service.impl;

import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.registration.QRegistrationEntry;
import pl.pwr.ite.server.model.entity.registration.RegistrationPart;
import pl.pwr.ite.server.model.filter.RegistrationPartFilter;
import pl.pwr.ite.server.model.repository.RegistrationPartRepository;
import pl.pwr.ite.server.service.RegistrationPartService;

import java.util.UUID;

@Service
public class RegistrationPartServiceImpl extends FilterableEntityServiceBase<RegistrationPart, RegistrationPartFilter> implements RegistrationPartService {

    public RegistrationPartServiceImpl(RegistrationPartRepository repository) {
        super(repository);
    }

    @Override
    public Long getRegisteredEntriesAmount(UUID partId) {
        var entryPath = QRegistrationEntry.registrationEntry;
        var a = createQuery()
                .from(entryPath)
                .select(entryPath.id.count())
                .where(entryPath.partId.eq(partId)).fetch();
        return null;
    }
}
