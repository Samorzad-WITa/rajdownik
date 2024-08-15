package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.UserDisplay;
import pl.pwr.ite.server.model.filter.UserDisplayFilter;

import java.time.LocalDateTime;
import java.util.Collection;

public interface UserDisplayService extends FilterableEntityService<UserDisplay, UserDisplayFilter> {

    Collection<UserDisplay> getAllActive(LocalDateTime referenceTime);
}
