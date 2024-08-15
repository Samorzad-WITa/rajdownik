package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.model.filter.UserFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;

import java.util.UUID;

public interface UserRepository extends FilterableRepository<User, UserFilter> {
}
