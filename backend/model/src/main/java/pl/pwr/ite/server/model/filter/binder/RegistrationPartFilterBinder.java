package pl.pwr.ite.server.model.filter.binder;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.model.entity.registration.QRegistrationPart;
import pl.pwr.ite.server.model.entity.registration.RegistrationPart;
import pl.pwr.ite.server.model.filter.RegistrationPartFilter;

@Component
public class RegistrationPartFilterBinder extends FilterBinderBase<RegistrationPart, RegistrationPartFilter, QRegistrationPart> {
}
