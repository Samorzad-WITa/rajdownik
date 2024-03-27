package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.Announcement;

import java.util.UUID;

public interface AnnouncementRepository extends JpaRepository<Announcement, UUID> {
}
