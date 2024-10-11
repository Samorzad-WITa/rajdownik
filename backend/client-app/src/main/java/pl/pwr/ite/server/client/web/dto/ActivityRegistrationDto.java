package pl.pwr.ite.server.client.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class ActivityRegistrationDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
        private boolean includeEntries;
        private boolean includeDetails;
    }

    private UUID id;

    private String title;

    private Boolean active;

    private Integer teamSizeLimit;

    private String termsAndRulesUrl;

    private LocalDateTime startTime;

    private ActivityEntryDto[] entries;
}
