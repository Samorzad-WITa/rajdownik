package pl.pwr.ite.server.client.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.pwr.ite.server.client.security.UserAuthenticationProvider;
import pl.pwr.ite.server.service.UserService;

@Configuration
public class AuthConfig {

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationProvider authenticationProvider) throws Exception {
        return new ProviderManager(authenticationProvider);
    }

    @Bean
    AuthenticationProvider authenticationProvider(UserService userService, PasswordEncoder passwordEncoder) {
        return new UserAuthenticationProvider(userService, passwordEncoder);
    }
}
