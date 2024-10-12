package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.Event;
import pl.pwr.ite.server.model.filter.EventFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;

import java.util.UUID;

public interface EventRepository extends FilterableRepository<Event, EventFilter> {
}
