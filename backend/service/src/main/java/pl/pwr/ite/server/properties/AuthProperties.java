package pl.pwr.ite.server.properties;

import lombok.Data;

@Data
public class AuthProperties {

    private String jwtSecret;

    private JwkProperties jwk;

    private AuthProviderProperties provider;
}
