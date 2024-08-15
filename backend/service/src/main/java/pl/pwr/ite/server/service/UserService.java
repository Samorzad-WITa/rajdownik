package pl.pwr.ite.server.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.model.filter.UserFilter;

import java.util.Set;

public interface UserService extends UserDetailsService, FilterableEntityService<User, UserFilter> {

    boolean existsByEmail(String email);
    void collectAuthorities(User user, Set<GrantedAuthority> grantedAuthorities);
    User findByEmail(String email);
}
