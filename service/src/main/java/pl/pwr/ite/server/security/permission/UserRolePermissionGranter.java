package pl.pwr.ite.server.security.permission;

import org.springframework.security.core.GrantedAuthority;
import pl.pwr.ite.server.model.entity.UserRole;

import java.util.Set;

public interface UserRolePermissionGranter extends PermissionGranter {

    void handle(UserRole userRole, Set<GrantedAuthority> grantedAuthorities);
}
