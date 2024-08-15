package pl.pwr.ite.server.model.filter.binder;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.model.entity.Activity;
import pl.pwr.ite.server.model.entity.QActivity;
import pl.pwr.ite.server.model.filter.ActivityFilter;

@Component
public class ActivityFilterBinder extends FilterBinderBase<Activity, ActivityFilter, QActivity> {
}
