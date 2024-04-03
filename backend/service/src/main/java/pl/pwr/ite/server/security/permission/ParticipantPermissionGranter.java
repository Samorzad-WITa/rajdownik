package pl.pwr.ite.server.security.permission;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.model.entity.UserRole;
import pl.pwr.ite.server.model.enums.Permission;

import java.util.Set;

@Component
public class ParticipantPermissionGranter extends PermissionGranterBase implements UserRolePermissionGranter{

    @Override
    public void handle(UserRole userRole, Set<GrantedAuthority> grantedAuthorities) {
        grant(grantedAuthorities, new PermissionAuthority(Permission.SystemView));
    }
}
