package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.UserToken;

import java.util.UUID;

public interface UserTokenRepository extends JpaRepository<UserToken, UUID> {
}
