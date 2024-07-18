package pl.pwr.ite.server.model.filter.binder;

import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.Predicate;
import org.springframework.data.domain.Sort;
import pl.pwr.ite.server.model.filter.Filter;

public interface FilterBinder<T, F extends Filter, Q extends EntityPath<?>> {

    Predicate bindFilter(F filter, Q path);
    Sort bindSort(F filter, Q path);
}