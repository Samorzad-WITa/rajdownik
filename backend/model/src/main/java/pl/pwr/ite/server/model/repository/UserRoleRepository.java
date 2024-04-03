package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.UserRole;

import java.util.UUID;

public interface UserRoleRepository extends JpaRepository<UserRole, UUID> {
}
