package pl.pwr.ite.server.service;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.AuthenticationException;
import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.security.AuthenticatedUser;

public interface JwtService {

    String createToken(AuthenticatedUser authenticatedUser);

    Claims resolveClaims(String token);

    boolean validateClaims(Claims claims) throws AuthenticationException;
}
