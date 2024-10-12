package pl.pwr.ite.server.model.querydsl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import pl.pwr.ite.server.model.entity.EntityBase;
import pl.pwr.ite.server.model.filter.Filter;

import java.util.List;
import java.util.UUID;

@NoRepositoryBean
public interface FilterableRepository<T extends EntityBase, F extends Filter> extends EntityRepository<T>, FilterExecutor<T, F> {

    List<T> findAll(F filter);
}
