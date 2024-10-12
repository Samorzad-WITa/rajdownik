package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.Role;
import pl.pwr.ite.server.model.filter.RoleFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;

import java.util.UUID;

public interface RoleRepository extends FilterableRepository<Role, RoleFilter> {
}
