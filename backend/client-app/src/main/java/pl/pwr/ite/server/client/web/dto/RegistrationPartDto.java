package pl.pwr.ite.server.client.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;

import java.util.UUID;

@Data
public class RegistrationPartDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
        private boolean includeRegistration;
        private boolean includeLock;
        private boolean includeEntries;
    }

    private UUID id;

    private String title;

    private Integer entryLimit;

    private boolean isLocked;

    private boolean ownsLock;

    private Integer entryAmount;

    private RegistrationEntryDto[] entries;

    private RegistrationDto registration;

    private RegistrationLockDto lock;
}
