package pl.pwr.ite.server.admin.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;

import java.util.UUID;

@Data
public class UserDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
    }

    private UUID id;

    private String email;

    private String phoneNumber;

    private String indexNumber;

    private String firstName;

    private String lastName;
}
