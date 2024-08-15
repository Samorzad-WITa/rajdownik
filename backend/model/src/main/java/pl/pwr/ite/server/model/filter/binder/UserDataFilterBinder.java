package pl.pwr.ite.server.model.filter.binder;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.model.entity.QUserData;
import pl.pwr.ite.server.model.entity.UserData;
import pl.pwr.ite.server.model.filter.UserDataFilter;

@Component
public class UserDataFilterBinder extends FilterBinderBase<UserData, UserDataFilter, QUserData> {
}
