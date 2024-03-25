package pl.pwr.ite.server.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import pl.pwr.ite.server.model.entity.User;

import java.util.Set;

public interface UserService extends UserDetailsService, EntityService<User> {

    boolean existsByEmail(String email);
    void collectAuthorities(User user, Set<GrantedAuthority> grantedAuthorities);
    User findByEmail(String email);
}
