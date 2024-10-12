package pl.pwr.ite.server.service.impl;

import com.querydsl.core.types.Ops;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.Activity;
import pl.pwr.ite.server.model.entity.QActivity;
import pl.pwr.ite.server.model.filter.ActivityFilter;
import pl.pwr.ite.server.model.repository.ActivityRepository;
import pl.pwr.ite.server.service.ActivityService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Service
public class ActivityServiceImpl extends FilterableEntityServiceBase<Activity, ActivityFilter> implements ActivityService {

    @PersistenceContext
    private EntityManager entityManager;

    public ActivityServiceImpl(ActivityRepository repository) {
        super(repository);
    }

    @Override
    public List<Activity> getList(ActivityFilter filter) {
        var path = QActivity.activity;
        return createQuery().select(path).from(path)
                .where(Expressions.allOf(
                        Expressions.dateTimeOperation(LocalDate.class, Ops.DateTimeOps.DATE, path.timeFrom)
                                .eq(LocalDate.from(filter.getDate()))
                )).orderBy(path.timeFrom.asc()).fetch();
    }

    @Override
    public Collection<Activity> getAllByDate(/*LocalDateTime referenceTime*/) {
        var path = QActivity.activity;
        return new JPAQuery<>(entityManager)
                .select(path).from(path)
//                .where(Expressions.dateTimeOperation(
//                        LocalDate.class,
//                        Ops.DateTimeOps.DATE,
//                        QActivity.activity.timeFrom)
//                        .eq(referenceTime.toLocalDate()
//                        )
//                )
                .orderBy(path.timeFrom.asc())
                .fetch();
    }
}
