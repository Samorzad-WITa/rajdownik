package pl.pwr.ite.server.auth.web.dto;

import lombok.Data;
import pl.pwr.ite.server.validation.ValidEmail;

@Data
public class UserDto {

    private String firstName;

    private String lastName;

    private String password;

    private String matchingPassword;

    @ValidEmail
    private String email;
}
