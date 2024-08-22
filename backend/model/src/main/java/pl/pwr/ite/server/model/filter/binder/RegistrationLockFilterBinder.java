package pl.pwr.ite.server.model.filter.binder;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.model.entity.registration.QRegistrationLock;
import pl.pwr.ite.server.model.entity.registration.RegistrationLock;
import pl.pwr.ite.server.model.filter.RegistrationLockFilter;

@Component
public class RegistrationLockFilterBinder extends FilterBinderBase<RegistrationLock, RegistrationLockFilter, QRegistrationLock> {
}