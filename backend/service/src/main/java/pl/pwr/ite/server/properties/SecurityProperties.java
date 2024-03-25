package pl.pwr.ite.server.properties;

import lombok.Data;
import org.springframework.web.cors.CorsConfiguration;

@Data
public class SecurityProperties {

    private CorsConfiguration cors;
}
