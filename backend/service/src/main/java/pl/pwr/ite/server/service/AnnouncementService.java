package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.Announcement;

import java.util.Collection;

public interface AnnouncementService extends EntityService<Announcement> {

    Collection<Announcement> getAll();
}
