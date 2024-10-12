package pl.pwr.ite.server.client.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.model.entity.registration.activity.ActivityEntryUser;

@Data
public class ActivityEntryDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
        private boolean includeActivityRegistration;
        private boolean includeTeamCaptain;
        private boolean includeUsers;
    }

    private String teamName;

    private UserDto teamCaptain;

    private ActivityRegistrationDto activityRegistration;

    private ActivityEntryUserDto[] users;
}
