package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.Announcement;
import pl.pwr.ite.server.model.filter.AnnouncementFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;

import java.util.UUID;

public interface AnnouncementRepository extends FilterableRepository<Announcement, AnnouncementFilter> {
}
