package pl.pwr.ite.server.model.querydsl;

import jakarta.persistence.EntityManager;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.NoRepositoryBean;
import pl.pwr.ite.server.model.entity.EntityBase;
import pl.pwr.ite.server.model.filter.Filter;

import java.util.List;

@NoRepositoryBean
public interface FilterExecutor<T extends EntityBase, F extends Filter> extends QuerydslPredicateExecutor<T> {

    EntityManager getEntityManager();

    List<T> findAll(F filter);
    TypedPage<T> findPage(F filter);
}
