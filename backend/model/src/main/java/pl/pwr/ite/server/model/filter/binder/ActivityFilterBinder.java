package pl.pwr.ite.server.model.filter.binder;

import com.querydsl.core.types.Ops;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.DateExpression;
import com.querydsl.core.types.dsl.Expressions;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.model.entity.Activity;
import pl.pwr.ite.server.model.entity.QActivity;
import pl.pwr.ite.server.model.filter.ActivityFilter;

import java.time.LocalDate;

@Component
public class ActivityFilterBinder extends FilterBinderBase<Activity, ActivityFilter, QActivity> {

    @Override
    protected Predicate bindDataFilter(PredicateBuilder<QActivity> builder, ActivityFilter filter) {
        return builder
                .addOptional(filter, (v, p) ->
                        Expressions.dateTimeOperation(LocalDate.class, Ops.DateTimeOps.DATE, v.timeFrom)
                                .eq(LocalDate.from(p.getDate())))
                .build();
    }

    @Override
    protected SortDetails bindSort(QActivity path, String sortSchema) {
        return switch (sortSchema) {
            case "timeFrom" -> SortDetails.builder().path(path.timeFrom).build();
            default -> throwNotSupportedSortSchemaException(sortSchema);
        };
    }
}
