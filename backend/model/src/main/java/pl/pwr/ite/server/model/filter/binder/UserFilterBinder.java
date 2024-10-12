package pl.pwr.ite.server.model.filter.binder;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.model.entity.QUser;
import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.model.filter.UserFilter;

@Component
public class UserFilterBinder extends FilterBinderBase<User, UserFilter, QUser> {
}
