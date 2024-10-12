package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.Activity;
import pl.pwr.ite.server.model.filter.ActivityFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;

import java.util.UUID;

public interface ActivityRepository extends FilterableRepository<Activity, ActivityFilter> {
}
