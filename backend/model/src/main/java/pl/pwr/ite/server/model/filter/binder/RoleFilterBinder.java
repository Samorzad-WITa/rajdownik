package pl.pwr.ite.server.model.filter.binder;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.model.entity.QRole;
import pl.pwr.ite.server.model.entity.Role;
import pl.pwr.ite.server.model.filter.RoleFilter;

@Component
public class RoleFilterBinder extends FilterBinderBase<Role, RoleFilter, QRole> {
}
