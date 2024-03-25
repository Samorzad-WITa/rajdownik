package pl.pwr.ite.server.client.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;

@Data
public class UserDataDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
        private boolean includeData;
        private boolean includeUser;
    }

    private DataDto data;

    private UserDto user;

    private String value;
}
