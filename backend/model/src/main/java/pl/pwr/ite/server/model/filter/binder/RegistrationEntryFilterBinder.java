package pl.pwr.ite.server.model.filter.binder;

import lombok.Data;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.model.entity.registration.QRegistrationEntry;
import pl.pwr.ite.server.model.entity.registration.RegistrationEntry;
import pl.pwr.ite.server.model.filter.Filter;
import pl.pwr.ite.server.model.filter.RegistrationEntryFilter;

@Component
public class RegistrationEntryFilterBinder extends FilterBinderBase<RegistrationEntry, RegistrationEntryFilter, QRegistrationEntry> {
}
