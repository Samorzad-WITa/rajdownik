package pl.pwr.ite.server.model.filter.binder;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.model.entity.Announcement;
import pl.pwr.ite.server.model.entity.QAnnouncement;
import pl.pwr.ite.server.model.filter.AnnouncementFilter;

@Component
public class AnnouncementFilterBinder extends FilterBinderBase<Announcement, AnnouncementFilter, QAnnouncement> {
}
