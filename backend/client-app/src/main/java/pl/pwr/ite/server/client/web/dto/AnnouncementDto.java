package pl.pwr.ite.server.client.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;

import java.util.UUID;

@Data
public class AnnouncementDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
    }

    private UUID id;

    private String title;

    private String description;
}
