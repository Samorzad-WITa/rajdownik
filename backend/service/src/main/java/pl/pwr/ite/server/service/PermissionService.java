package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.enums.Permission;
import pl.pwr.ite.server.security.permission.PermissionAuthority;

import java.util.Collection;

public interface PermissionService {

    boolean hasAccess(Permission permission, Collection<PermissionAuthority> authorities);
}
