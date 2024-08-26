package pl.pwr.ite.server.client.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;

@Data
public class RegistrationPartDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
        private boolean includeRegistration;
        private boolean includeLock;
        private boolean includeEntries;
    }

    private String title;

    private Integer entryLimit;

    private RegistrationEntryDto[] entries;

    private RegistrationDto registration;

    private RegistrationLockDto lock;
}
