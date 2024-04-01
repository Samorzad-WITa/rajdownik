package pl.pwr.ite.server.service;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.AuthenticationException;
import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.security.AuthenticatedUser;

public interface JwtService {

    String extractUsername(String token);

    String generateToken(AuthenticatedUser authenticatedUser);

    boolean isTokenValid(String token, AuthenticatedUser authenticatedUser);

    boolean isTokenExpired(String token);

    long getExpirationTime();
}
