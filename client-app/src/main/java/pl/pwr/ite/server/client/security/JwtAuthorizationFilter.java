package pl.pwr.ite.server.client.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import pl.pwr.ite.server.security.ClaimsAuthenticatedUserTokenConverter;
import pl.pwr.ite.server.security.JwtGrantedAuthorityConverter;
import pl.pwr.ite.server.service.JwtService;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final ClaimsAuthenticatedUserTokenConverter tokenConverter;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = resolveToken(request);
        if(accessToken == null) {
            filterChain.doFilter(request, response);
            return;
        }
        var claims = jwtService.resolveClaims(accessToken);
        if(claims != null && jwtService.validateClaims(claims)) {
            var token = tokenConverter.convert(claims);
            SecurityContextHolder.getContext().setAuthentication(token);
        }
    }

    private String resolveToken(HttpServletRequest request) {
        var resolver = new CustomBearerTokenResolver("authorization-token", "authorization");
        return resolver.resolve(request);
    }
}
