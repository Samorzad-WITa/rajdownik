package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.EntityBase;
import pl.pwr.ite.server.model.filter.Filter;
import pl.pwr.ite.server.model.querydsl.TypedPage;

import java.util.List;

public interface FilterableEntityService<E extends EntityBase, F extends Filter> extends EntityService<E> {

    List<E> getList(F filter);

    TypedPage<E> getPage(F filter);
}
