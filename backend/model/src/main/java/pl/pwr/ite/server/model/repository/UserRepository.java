package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.User;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
}
