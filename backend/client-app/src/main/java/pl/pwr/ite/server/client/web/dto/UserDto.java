package pl.pwr.ite.server.client.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;

import java.util.UUID;

@Data
public class UserDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
        private boolean includeData;
        private boolean includeDetails;
        private boolean includeActivityEntries;
    }

    private UUID id;

    private String code;

    private String email;

    private String phoneNumber;

    private String indexNumber;

    private String profileUrl;

    private String firstName;

    private String lastName;

    private String roomNumber;

    private String dietType;

    private Integer busNumber;

    private ActivityEntryDto[] activityEntries;
}
