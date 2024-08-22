package pl.pwr.ite.server.admin.web.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.model.entity.registration.RegistrationEntry;
import pl.pwr.ite.server.model.entity.registration.RegistrationLock;

@Data
public class RegistrationPartDto {

    @Data
    @Accessors(chain = true)
    public static abstract class Properties implements MappingProperties {
        private boolean includeRegistration;
        private boolean includeEntries;
        private boolean includeLock;
    }

    private RegistrationDto registration;

    private RegistrationEntryDto[] entries;

    private RegistrationLockDto lock;

    private Integer entryLimit;

    private String title;
}
