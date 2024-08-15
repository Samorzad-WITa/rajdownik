package pl.pwr.ite.server.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.UserRole;
import pl.pwr.ite.server.model.filter.UserRoleFilter;
import pl.pwr.ite.server.model.repository.UserRoleRepository;
import pl.pwr.ite.server.service.UserRoleService;

import java.util.UUID;

@Service
public class UserRoleServiceImpl extends FilterableEntityServiceBase<UserRole, UserRoleFilter> implements UserRoleService {

    public UserRoleServiceImpl(UserRoleRepository repository) {
        super(repository);
    }
}
