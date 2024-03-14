package pl.pwr.ite.server.service.impl;

import com.nimbusds.jwt.JWTParser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.Data;
import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.security.AuthenticatedUser;
import pl.pwr.ite.server.security.JwtGrantedAuthorityConverter;
import pl.pwr.ite.server.service.ClockService;
import pl.pwr.ite.server.service.JwtService;

import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService, InitializingBean {

    private final JwtGrantedAuthorityConverter authorityConverter;

    private final String TOKEN_HEADER = "Authentication";
    private final String TOKEN_PREFIX = "Bearer ";

    private final ClockService clockService;
    private final String secretKey = "mysecretkey";
    private final long accessTokenValidityTime = 60 * 60 * 1000;

    private JwtParser jwtParser;

    @Override
    public void afterPropertiesSet() throws Exception {
        this.jwtParser = Jwts.parser().setSigningKey(secretKey);
    }


    @Override
    public String createToken(AuthenticatedUser authenticatedUser) {
        var claims = Jwts.claims().setSubject(authenticatedUser.getUsername());
        claims.put("email", authenticatedUser.getEmail());
        claims.put("uid", authenticatedUser.getUserId());
        claims.put("userType", authenticatedUser.getUserType());

        Collection<String> authorities = authenticatedUser.getAuthorities()
                        .stream().map(authorityConverter::toClaim).toList();
        claims.put("authorities", authorities);
        var tokenCreateDate = new Date();
        var tokenExpireDate = new Date(tokenCreateDate.getTime() + accessTokenValidityTime);
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(tokenExpireDate)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
                                                                                                                                                                                     // jebac samorzad tylko kurwy z bajeru auuu auuuu
    @Override
    public Claims resolveClaims(String token) {
        if(token == null) {
            return null;
        }
        return jwtParser.parseClaimsJws(token).getBody();
    }

    @Override
    public boolean validateClaims(Claims claims) throws AuthenticationException {
        try {
            return claims.getExpiration().after(new Date());
        } catch (Exception ex) {
            throw ex;
        }
    }
}
