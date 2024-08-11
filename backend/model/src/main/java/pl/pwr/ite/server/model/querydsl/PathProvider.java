package pl.pwr.ite.server.model.querydsl;

import com.querydsl.core.types.EntityPath;

public interface PathProvider<T> {

    EntityPath<T> getPath();
}
