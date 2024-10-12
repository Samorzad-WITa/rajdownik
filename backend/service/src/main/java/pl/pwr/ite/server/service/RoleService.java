package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.Role;
import pl.pwr.ite.server.model.filter.RoleFilter;

public interface RoleService extends FilterableEntityService<Role, RoleFilter> {

    Role findByCode(String name);
}
