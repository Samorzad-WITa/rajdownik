package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.Activity;

import java.time.LocalDateTime;
import java.util.Collection;

public interface ActivityService extends EntityService<Activity> {

    Collection<Activity> getAllByDate(/*LocalDateTime referenceTime*/);
}
