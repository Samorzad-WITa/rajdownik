package pl.pwr.ite.server.service.impl;

import com.querydsl.core.types.dsl.Expressions;
import lombok.NonNull;
import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.model.entity.registration.*;
import pl.pwr.ite.server.model.filter.RegistrationLockFilter;
import pl.pwr.ite.server.model.repository.RegistrationLockRepository;
import pl.pwr.ite.server.service.ClockService;
import pl.pwr.ite.server.service.RegistrationLockService;
import pl.pwr.ite.server.service.RegistrationPartService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class RegistrationLockServiceImpl extends FilterableEntityServiceBase<RegistrationLock, RegistrationLockFilter> implements RegistrationLockService {

    public RegistrationLockServiceImpl(RegistrationLockRepository repository) {
        super(repository);
    }

    @Override
    public RegistrationLock findByPartId(UUID partId) {
        var path = QRegistrationLock.registrationLock;
        return createQuery().from(path).select(path)
                .where(path.partId.eq(partId))
                .fetchOne();
    }

    @Override
    public RegistrationLock findByOwnerId(UUID ownerId) {
        var path = QRegistrationLock.registrationLock;
        return createQuery().select(path).from(path)
                .where(path.ownerId.eq(ownerId))
                .fetchOne();
    }

    @Override
    public List<RegistrationLock> getAllInOngoingRegistration(LocalDateTime referenceTime) {
        var rPath = QRegistration.registration;
        var rpPath = QRegistrationPart.registrationPart;
        var rlPath = QRegistrationLock.registrationLock;
        return createQuery().from(rlPath).select(rlPath)
                .leftJoin(rlPath.part, rpPath).on(rlPath.partId.eq(rpPath.id))
                .leftJoin(rpPath.registration, rPath).on(rpPath.registrationId.eq(rPath.id))
                .where(Expressions.allOf(
                        rPath.active.isTrue(),
                        rPath.startTime.before(referenceTime)
                )).fetch();
    }
}
