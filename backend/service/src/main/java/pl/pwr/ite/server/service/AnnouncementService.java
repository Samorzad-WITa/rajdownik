package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.Announcement;
import pl.pwr.ite.server.model.filter.AnnouncementFilter;

import java.util.Collection;

public interface AnnouncementService extends FilterableEntityService<Announcement, AnnouncementFilter> {

    Collection<Announcement> getAll();
}
