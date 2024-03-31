package pl.pwr.ite.server.client.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;

import java.util.UUID;

@Data
public class DataDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {

    }

    private String label;
}
