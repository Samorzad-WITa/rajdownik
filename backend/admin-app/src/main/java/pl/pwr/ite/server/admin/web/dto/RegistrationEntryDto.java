package pl.pwr.ite.server.admin.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;

@Data
public class RegistrationEntryDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {

    }
}
