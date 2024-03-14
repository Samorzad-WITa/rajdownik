package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.UserDisplay;

import java.util.UUID;

public interface UserDisplayRepository extends JpaRepository<UserDisplay, UUID> {
}
