package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.Data;
import pl.pwr.ite.server.model.filter.DataFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;

import java.util.UUID;

public interface DataRepository extends FilterableRepository<Data, DataFilter> {
}
