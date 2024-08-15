package pl.pwr.ite.server.model.filter.binder;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.model.entity.QUserDisplay;
import pl.pwr.ite.server.model.entity.UserDisplay;
import pl.pwr.ite.server.model.filter.UserDisplayFilter;

@Component
public class UserDisplayFilterBinder extends FilterBinderBase<UserDisplay, UserDisplayFilter, QUserDisplay> {
}
