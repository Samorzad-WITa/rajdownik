package pl.pwr.ite.server.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.pwr.ite.server.properties.AuthProperties;
import pl.pwr.ite.server.properties.SecurityProperties;
import pl.pwr.ite.server.properties.ServiceProperties;

@Configuration
@RequiredArgsConstructor
public class PropertiesConfig {
    private final ServiceProperties serviceProperties;

    @Bean
    public SecurityProperties securityProperties() {
        return serviceProperties.getSecurity();
    }

    @Bean
    public AuthProperties authProperties() {
        return serviceProperties.getAuth();
    }
}
