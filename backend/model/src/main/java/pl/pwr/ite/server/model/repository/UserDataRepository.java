package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.UserData;
import pl.pwr.ite.server.model.filter.UserDataFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;

import java.util.UUID;

public interface UserDataRepository extends FilterableRepository<UserData, UserDataFilter> {
}
