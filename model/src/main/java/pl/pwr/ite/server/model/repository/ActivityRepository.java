package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.Activity;

import java.util.UUID;

public interface ActivityRepository extends JpaRepository<Activity, UUID> {
}
