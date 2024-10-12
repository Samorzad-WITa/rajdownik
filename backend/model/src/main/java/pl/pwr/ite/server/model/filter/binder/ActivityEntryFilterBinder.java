package pl.pwr.ite.server.model.filter.binder;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.model.entity.registration.activity.ActivityEntry;
import pl.pwr.ite.server.model.entity.registration.activity.QActivityEntry;
import pl.pwr.ite.server.model.filter.ActivityEntryFilter;

@Component
public class ActivityEntryFilterBinder extends FilterBinderBase<ActivityEntry, ActivityEntryFilter, QActivityEntry> {
}
