package pl.pwr.ite.server.model.querydsl;

import org.springframework.data.domain.Page;
import pl.pwr.ite.server.model.entity.EntityBase;

public interface TypedPage<T extends EntityBase> extends Page<T> {

    Class<T> getType();
}
