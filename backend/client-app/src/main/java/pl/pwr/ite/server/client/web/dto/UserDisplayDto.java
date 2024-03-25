package pl.pwr.ite.server.client.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;

import java.time.LocalDateTime;

@Data
public class UserDisplayDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
        private boolean includeUser;
    }

    private UserDto user;

    private String label;

    private LocalDateTime timeFrom;

    private LocalDateTime timeTo;
}
