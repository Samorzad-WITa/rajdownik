package pl.pwr.ite.server.service.impl;

import com.querydsl.jpa.impl.JPAQuery;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.Announcement;
import pl.pwr.ite.server.model.entity.QAnnouncement;
import pl.pwr.ite.server.model.repository.AnnouncementRepository;
import pl.pwr.ite.server.service.AnnouncementService;

import java.util.Collection;

@Service
public class AnnouncementServiceImpl extends EntityServiceBase<Announcement> implements AnnouncementService {

    @PersistenceContext
    private EntityManager entityManager;

    public AnnouncementServiceImpl(AnnouncementRepository repository) {
        super(repository);
    }

    @Override
    public Collection<Announcement> getAll() {
        var path = QAnnouncement.announcement;
        return new JPAQuery<>(entityManager).select(path).from(path)
                .orderBy(path.modified.desc())
                .fetch();
    }
}
