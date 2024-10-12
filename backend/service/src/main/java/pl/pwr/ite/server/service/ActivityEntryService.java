package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.registration.activity.ActivityEntry;
import pl.pwr.ite.server.model.filter.ActivityEntryFilter;

import java.rmi.server.UID;
import java.util.UUID;

public interface ActivityEntryService extends FilterableEntityService<ActivityEntry, ActivityEntryFilter> {

    ActivityEntry findRegisteredActivityEntry(UUID activityRegistrationId, UUID userId);
    boolean existByTeamName(UUID activityRegistrationId, String teamName);
}
