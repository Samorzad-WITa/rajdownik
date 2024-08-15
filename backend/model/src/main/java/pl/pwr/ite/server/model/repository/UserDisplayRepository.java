package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.UserDisplay;
import pl.pwr.ite.server.model.filter.UserDisplayFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;

import java.util.UUID;

public interface UserDisplayRepository extends FilterableRepository<UserDisplay, UserDisplayFilter> {
}
