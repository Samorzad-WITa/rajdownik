package pl.pwr.ite.server.service.impl;

import com.querydsl.core.types.dsl.Expressions;
import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.registration.activity.ActivityEntry;
import pl.pwr.ite.server.model.entity.registration.activity.QActivityEntry;
import pl.pwr.ite.server.model.entity.registration.activity.QActivityEntryUser;
import pl.pwr.ite.server.model.entity.registration.activity.QActivityRegistration;
import pl.pwr.ite.server.model.filter.ActivityEntryFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;
import pl.pwr.ite.server.model.repository.ActivityEntryRepository;
import pl.pwr.ite.server.service.ActivityEntryService;

import java.util.UUID;

@Service
public class ActivityEntryServiceImpl extends FilterableEntityServiceBase<ActivityEntry, ActivityEntryFilter> implements ActivityEntryService {

    public ActivityEntryServiceImpl(ActivityEntryRepository repository) {
        super(repository);
    }

    @Override
    public ActivityEntry findRegisteredActivityEntry(UUID activityRegistrationId, UUID userId) {
        var acEnPath = QActivityEntry.activityEntry;
        var acRegPath = QActivityRegistration.activityRegistration;
        var acRegUserPath = QActivityEntryUser.activityEntryUser;
        return createQuery().select(acEnPath).from(acEnPath)
                .leftJoin(acEnPath.activityRegistration, acRegPath)
                .on(acRegPath.id.eq(activityRegistrationId))
                .leftJoin(acEnPath.users, acRegUserPath)
                .on(acRegUserPath.activityEntryId.eq(acRegUserPath.id))
                .where(Expressions.allOf(
                        acEnPath.activityRegistrationId.eq(activityRegistrationId),
                        acEnPath.users.any().userId.eq(userId)
                )).fetchOne();
    }

    @Override
    public boolean existByTeamName(UUID activityRegistrationId, String teamName) {
        var path = QActivityEntry.activityEntry;
        return createQuery().select(path.id).from(path).where(Expressions.allOf(
                path.teamName.eq(teamName),
                path.activityRegistrationId.eq(activityRegistrationId)
        )).fetchFirst() != null;
    }
}
