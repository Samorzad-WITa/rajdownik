package pl.pwr.ite.server.admin.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class RegistrationDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
        private boolean includeParts;
    }

    private UUID id;

    private String title;

    private LocalDateTime startTime;

    private Boolean active;

    private RegistrationPartDto[] parts;
}
