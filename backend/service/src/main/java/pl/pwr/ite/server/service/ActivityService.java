package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.Activity;
import pl.pwr.ite.server.model.filter.ActivityFilter;

import java.time.LocalDateTime;
import java.util.Collection;

public interface ActivityService extends FilterableEntityService<Activity, ActivityFilter> {

    Collection<Activity> getAllByDate(/*LocalDateTime referenceTime*/);
}
