package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.model.entity.UserToken;

import java.time.LocalDateTime;

public interface UserTokenService extends EntityService<UserToken> {

    String generateToken(User user);

    UserToken findByToken(String token, LocalDateTime referenceTime);
}
