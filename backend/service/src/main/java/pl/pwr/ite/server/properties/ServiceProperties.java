package pl.pwr.ite.server.properties;

import lombok.Data;

@Data
public class ServiceProperties {
    private SecurityProperties security = new SecurityProperties();
    private AuthProperties auth = new AuthProperties();
}
