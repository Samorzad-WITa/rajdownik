package pl.pwr.ite.server.model.filter.binder;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.model.entity.QUserToken;
import pl.pwr.ite.server.model.entity.UserToken;
import pl.pwr.ite.server.model.filter.UserTokenFilter;

@Component
public class UserTokenFilterBinder extends FilterBinderBase<UserToken, UserTokenFilter, QUserToken> {
}
