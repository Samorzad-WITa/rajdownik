package pl.pwr.ite.server.client.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;

@Data
public class RegistrationEntryDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
        private boolean includePart;
        private boolean includeUser;
    }

    private UserDto user;

    private String firstName;

    private String lastName;

    private RegistrationPartDto part;
}
