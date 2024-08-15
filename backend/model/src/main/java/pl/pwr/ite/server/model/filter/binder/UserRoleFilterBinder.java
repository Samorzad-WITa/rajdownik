package pl.pwr.ite.server.model.filter.binder;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.model.entity.QUserRole;
import pl.pwr.ite.server.model.entity.UserRole;
import pl.pwr.ite.server.model.filter.UserRoleFilter;

@Component
public class UserRoleFilterBinder extends FilterBinderBase<UserRole, UserRoleFilter, QUserRole> {
}
