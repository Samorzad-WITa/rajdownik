package pl.pwr.ite.server.client.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;

@Data
public class ActivityEntryUserDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
        private boolean includeActivityEntry;
        private boolean includeUser;
    }

    private ActivityEntryDto activityEntry;

    private UserDto user;
}
