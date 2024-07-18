package pl.pwr.ite.server.admin.web.dto;

import lombok.Data;

@Data
public class JwtDto {

    private String token;

    private Long expiresIn;
}
