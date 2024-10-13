package pl.pwr.ite.server.client.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.model.enums.UserDisplayContactType;

import java.util.UUID;

@Data
public class UserDisplayDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
        private boolean includeUser;
    }

    private UUID id;

    private UserDto user;

    private String label;

    private String groupName;

    private UserDisplayContactType contactType;
}
