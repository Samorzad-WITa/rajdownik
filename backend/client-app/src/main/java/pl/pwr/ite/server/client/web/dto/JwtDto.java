package pl.pwr.ite.server.client.web.dto;

import lombok.Data;

@Data
public class JwtDto {

    private String token;

    private Long expiresIn;
}
