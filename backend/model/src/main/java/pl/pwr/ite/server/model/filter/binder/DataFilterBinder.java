package pl.pwr.ite.server.model.filter.binder;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.model.entity.Data;
import pl.pwr.ite.server.model.entity.QData;
import pl.pwr.ite.server.model.filter.DataFilter;

@Component
public class DataFilterBinder extends FilterBinderBase<Data, DataFilter, QData> {
}
