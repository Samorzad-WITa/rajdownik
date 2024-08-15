package pl.pwr.ite.server.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.UserToken;
import pl.pwr.ite.server.model.filter.UserTokenFilter;
import pl.pwr.ite.server.model.querydsl.FilterableRepository;

import java.util.UUID;

public interface UserTokenRepository extends FilterableRepository<UserToken, UserTokenFilter> {
}
