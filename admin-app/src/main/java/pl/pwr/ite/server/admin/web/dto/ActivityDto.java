package pl.pwr.ite.server.admin.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;

import java.time.LocalDateTime;

@Data
public class ActivityDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
        private boolean includeEvent;
    }

    private EventDto event;

    private LocalDateTime timeFrom;

    private LocalDateTime timeTo;

    private String location;

    private String title;

    private String description;
}

