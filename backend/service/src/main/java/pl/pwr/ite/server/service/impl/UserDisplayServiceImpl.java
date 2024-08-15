package pl.pwr.ite.server.service.impl;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.QUserDisplay;
import pl.pwr.ite.server.model.entity.UserDisplay;
import pl.pwr.ite.server.model.filter.UserDisplayFilter;
import pl.pwr.ite.server.model.repository.UserDisplayRepository;
import pl.pwr.ite.server.service.UserDisplayService;

import java.time.LocalDateTime;
import java.util.Collection;

@Service
public class UserDisplayServiceImpl extends FilterableEntityServiceBase<UserDisplay, UserDisplayFilter> implements UserDisplayService {

    @PersistenceContext
    private EntityManager entityManager;

    public UserDisplayServiceImpl(UserDisplayRepository repository) {
        super(repository);
    }

    @Override
    public Collection<UserDisplay> getAllActive(LocalDateTime referenceTime) {
        var path = QUserDisplay.userDisplay;
        return new JPAQuery<>(entityManager)
                .select(path).from(path)
                .where(Expressions.allOf(
                        path.timeFrom.before(referenceTime),
                        path.timeTo.after(referenceTime)
                ).or(Expressions.allOf(
                        path.timeFrom.before(referenceTime),
                        path.timeTo.isNull()
                ))).fetch();
    }
}
