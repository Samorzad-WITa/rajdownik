package pl.pwr.ite.server.client.web.dto;

import lombok.Data;

@Data
public class PasswordResetDto {

    private String token;

    private String newPassword;
}
