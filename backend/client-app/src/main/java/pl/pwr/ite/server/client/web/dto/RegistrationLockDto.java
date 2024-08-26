package pl.pwr.ite.server.client.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.model.entity.UserDisplay;

import java.time.LocalDateTime;

@Data
public class RegistrationLockDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
        private boolean includePart;
        private boolean includeOwner;
    }

    private RegistrationPartDto part;

    private UserDto owner;

    private LocalDateTime expiresAt;

}
