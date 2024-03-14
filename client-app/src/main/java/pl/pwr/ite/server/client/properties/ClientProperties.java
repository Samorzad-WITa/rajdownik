package pl.pwr.ite.server.client.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import pl.pwr.ite.server.properties.ServiceProperties;

@ConfigurationProperties("rajdownik")
@Data
public class ClientProperties extends ServiceProperties {
}
