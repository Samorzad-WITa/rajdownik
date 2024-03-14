package pl.pwr.ite.server.admin.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class EventDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
    }

    private UUID id;

    private LocalDateTime timeFrom;

    private LocalDateTime timeTo;

    private String title;
}
