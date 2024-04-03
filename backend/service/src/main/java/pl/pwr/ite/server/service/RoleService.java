package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.Role;

public interface RoleService extends EntityService<Role> {

    Role findByCode(String name);
}
