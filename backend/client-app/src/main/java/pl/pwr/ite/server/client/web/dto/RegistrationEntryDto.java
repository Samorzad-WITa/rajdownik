package pl.pwr.ite.server.client.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;

import java.util.UUID;

@Data
public class RegistrationEntryDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
        private boolean includePart;
        private boolean includeUser;
    }

    private UUID id;

    private UserDto user;

    private String firstName;

    private String lastName;

    private String userCode;

    private boolean canDelete;

    private RegistrationPartDto part;
}
