package pl.pwr.ite.server.client.security;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.oauth2.server.resource.web.BearerTokenResolver;
import org.springframework.security.oauth2.server.resource.web.DefaultBearerTokenResolver;

import java.util.ArrayList;
import java.util.List;

public class CustomBearerTokenResolver {

    private final List<BearerTokenResolver> resolvers = new ArrayList<>();

    public CustomBearerTokenResolver(String... headersNames) {
        for(var headerName : headersNames) {
            var resolver = new DefaultBearerTokenResolver();
            resolver.setBearerTokenHeaderName(headerName);
            resolvers.add(resolver);
        }
    }

    public String resolve(HttpServletRequest request) {
        for(var resolver : resolvers) {
            var resolved = resolver.resolve(request);
            if(resolved != null) {
                return resolved;
            }
        }
        return null;
    }
}
