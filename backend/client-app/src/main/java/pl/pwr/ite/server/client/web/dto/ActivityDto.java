package pl.pwr.ite.server.client.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class ActivityDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
        private boolean includeActivityRegistration;
    }

    private UUID id;

    private LocalDateTime timeFrom;

    private LocalDateTime timeTo;

    private String location;

    private String title;

    private String description;

    private ActivityRegistrationDto activityRegistration;
}

