package pl.pwr.ite.server.model.filter.binder;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.model.entity.registration.QRegistration;
import pl.pwr.ite.server.model.entity.registration.Registration;
import pl.pwr.ite.server.model.filter.RegistrationFilter;

@Component
public class RegistrationFilterBinder extends FilterBinderBase<Registration, RegistrationFilter, QRegistration> {
}
