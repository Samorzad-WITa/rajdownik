package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.Event;

import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {
}
