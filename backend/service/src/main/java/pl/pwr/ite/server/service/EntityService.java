package pl.pwr.ite.server.service;

import com.querydsl.jpa.impl.JPAQuery;
import pl.pwr.ite.server.model.entity.EntityBase;

import java.util.Collection;
import java.util.UUID;

public interface EntityService<E extends EntityBase> {

    E findById(UUID id);

    Collection<E> getAll();

    <T extends E> T save(T entity);

    <T extends E> T saveAndFlush(T entity);

    void delete(E entity);

    void deleteById(UUID id);

    E getReference(UUID id);
}
