package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.UserDisplay;

import java.time.LocalDateTime;
import java.util.Collection;

public interface UserDisplayService extends EntityService<UserDisplay> {

    Collection<UserDisplay> getAllActive(LocalDateTime referenceTime);
}
