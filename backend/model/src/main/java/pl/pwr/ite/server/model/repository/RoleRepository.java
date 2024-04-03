package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.Role;

import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {
}
