package pl.pwr.ite.server.service.impl;

import com.google.common.base.CaseFormat;
import com.querydsl.jpa.impl.JPAQuery;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.context.ApplicationContext;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.QUser;
import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.model.entity.UserRole;
import pl.pwr.ite.server.model.repository.UserRepository;
import pl.pwr.ite.server.security.AuthenticatedUser;
import pl.pwr.ite.server.security.permission.UserRolePermissionGranter;
import pl.pwr.ite.server.service.UserService;

import java.util.Set;

@Service
public class UserServiceImpl extends EntityServiceBase<User> implements UserService {

    @PersistenceContext
    private EntityManager entityManager;

    private final ApplicationContext applicationContext;

    public UserServiceImpl(UserRepository repository, ApplicationContext applicationContext) {
        super(repository);
        this.applicationContext = applicationContext;
    }

    @Override
    public User findByEmail(String email) {
        var path = QUser.user;
        return new JPAQuery<>(entityManager).select(path).from(path).where(path.email.eq(email)).fetchOne();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var path = QUser.user;
        var tuple = new JPAQuery<>(entityManager).select(path.id, path.email, path.type).from(path).where(path.email.eq(username)).fetchOne();
        if(tuple == null) {
            throw new UsernameNotFoundException(String.format("User with email '%s' not found", username));
        }
        var userId = tuple.get(path.id);
        var type = tuple.get(path.type);
        return AuthenticatedUser.builder().userId(userId).email(username).userType(type).build();
    }

    @Override
    public void collectAuthorities(User user, Set<GrantedAuthority> grantedAuthorities) {
        grant(grantedAuthorities, user);
    }

    protected void grant(Set<GrantedAuthority> authorities, User user) {
        for(var userRole : user.getRoles()) {
            var role = userRole.getRole();
            var granterNames = role.getPermissionGranters();
            grant(authorities, userRole, granterNames);
        }
    }

    protected void grant(Set<GrantedAuthority> authorities, UserRole userRole, String granterBeanName) {
        var granter = applicationContext.getBean(granterBeanName, UserRolePermissionGranter.class);
        granter.handle(userRole, authorities);
    }

    protected void grant(Set<GrantedAuthority> authorities, UserRole userRole, String... granterNames) {
        for (var granterName : granterNames) {
            var granterBeanName = getGranterBeanName(granterName);
            grant(authorities, userRole, granterBeanName);
        }
    }

    protected String getGranterBeanName(String granterName) {
        return CaseFormat.LOWER_HYPHEN.to(CaseFormat.LOWER_CAMEL, granterName) + "PermissionGranter";
    }

    @Override
    public boolean existsByEmail(String email) {
        var path = QUser.user;
        return new JPAQuery<>(entityManager)
                .select(path).from(path)
                .where(path.email.eq(email))
                .fetchFirst() != null;
    }
}