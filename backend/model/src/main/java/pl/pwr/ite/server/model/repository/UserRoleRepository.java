package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.UserRole;
import pl.pwr.ite.server.model.filter.UserRoleFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;

import java.util.UUID;

public interface UserRoleRepository extends FilterableRepository<UserRole, UserRoleFilter> {
}
