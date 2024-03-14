package pl.pwr.ite.server.properties;

import lombok.Data;

@Data
public class JwkProperties {

    private String privateKey;

    private String publicKey;
}
