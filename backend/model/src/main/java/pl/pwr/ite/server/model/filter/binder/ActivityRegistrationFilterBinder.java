package pl.pwr.ite.server.model.filter.binder;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.model.entity.registration.activity.ActivityRegistration;
import pl.pwr.ite.server.model.entity.registration.activity.QActivityRegistration;
import pl.pwr.ite.server.model.filter.ActivityRegistrationFilter;

@Component
public class ActivityRegistrationFilterBinder extends FilterBinderBase<ActivityRegistration, ActivityRegistrationFilter, QActivityRegistration> {
}
