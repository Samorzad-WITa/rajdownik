package pl.pwr.ite.server.service.impl;

import com.nimbusds.jwt.JWTParser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
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

import java.security.Key;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService, InitializingBean {

    private final JwtGrantedAuthorityConverter authorityConverter;
    private final String secretKey = "688dc1754ba81961938cee3adb5b1b68167c1cf5531f6da17490b550b6465fb8";
    private final long accessTokenValidityTime = 60 * 60 * 1000;

    private final ClockService clockService;

    @Override
    public void afterPropertiesSet() throws Exception {
    }


    public String createToken(AuthenticatedUser authenticatedUser, long expiration) {
        var claims = Jwts.claims().setSubject(authenticatedUser.getUsername());
        claims.put("email", authenticatedUser.getEmail());
        claims.put("uid", authenticatedUser.getUserId());
        claims.put("userType", authenticatedUser.getUserType());

//        Collection<String> authorities = authenticatedUser.getAuthorities()
//                        .stream().map(authorityConverter::toClaim).toList();
//        claims.put("authorities", authorities);
        var tokenCreateDate = new Date(System.currentTimeMillis());
        var tokenExpireDate = new Date(tokenCreateDate.getTime() + expiration);
        return Jwts
                .builder()
                .setClaims(claims)
                .setSubject(authenticatedUser.getEmail())
                .setIssuedAt(tokenCreateDate)
                .setExpiration(tokenExpireDate)
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    @Override
    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    @Override
    public String generateToken(AuthenticatedUser authenticatedUser) {
        return createToken(authenticatedUser, accessTokenValidityTime);
    }

    @Override
    public boolean isTokenValid(String token, AuthenticatedUser authenticatedUser) {
        final String username = extractUsername(token);
        return (username.equals(authenticatedUser.getEmail())) && !isTokenExpired(token);
    }

    @Override
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(clockService.getCurrentDate());
    }

    @Override
    public long getExpirationTime() {
        return accessTokenValidityTime;
    }

    private Date extractExpiration(String token) {
        return extractClaims(token, Claims::getExpiration);
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
        var claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


    private Key getSignInKey() {
        var keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
