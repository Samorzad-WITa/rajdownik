package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.UserData;

import java.util.UUID;

public interface UserDataRepository extends JpaRepository<UserData, UUID> {
}
