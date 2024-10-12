package pl.pwr.ite.server.model.filter.binder;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.model.entity.registration.activity.ActivityEntryUser;
import pl.pwr.ite.server.model.entity.registration.activity.QActivityEntryUser;
import pl.pwr.ite.server.model.filter.ActivityEntryUserFilter;

@Component
public class ActivityEntryUserFilterBinder extends FilterBinderBase<ActivityEntryUser, ActivityEntryUserFilter, QActivityEntryUser> {
}
