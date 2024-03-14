package pl.pwr.ite.server.admin.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;

@Data
public class UserDataDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
        private boolean includeUser;
        private boolean includeData;
    }

    private UserDto user;

    private DataDto data;

    private String value;
}
