package pl.pwr.ite.server.client.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pwr.ite.server.client.web.dto.ActivityEntryDto;
import pl.pwr.ite.server.client.web.dto.ActivityRegistrationDto;
import pl.pwr.ite.server.client.web.dto.UserDto;
import pl.pwr.ite.server.client.web.service.ActivityEntryFacade;
import pl.pwr.ite.server.client.web.service.ActivityRegistrationFacade;
import pl.pwr.ite.server.client.web.service.UserFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.model.filter.ActivityRegistrationFilter;
import pl.pwr.ite.server.service.MappingService;

import java.util.Collection;
import java.util.UUID;

@RestController
@RequestMapping("/activity-registration")
@RequiredArgsConstructor
public class ActivityRegistrationController implements InitializingBean {

    private final ActivityRegistrationFacade activityRegistrationFacade;
    private final ActivityEntryFacade activityEntryFacade;
    private final UserFacade userFacade;
    private final MappingService mappingService;

    private MappingProperties defaultListProperties;
    private MappingProperties defaultSingleProperties;
    private MappingProperties userSingleProperties;
    private MappingProperties activityEntrySingleProperties;

    @Override
    public void afterPropertiesSet() throws Exception {
        defaultListProperties = mappingService.createProperties(ActivityRegistrationDto.Properties.class);

        defaultSingleProperties = mappingService.createProperties(ActivityRegistrationDto.Properties.class)
                .setIncludeDetails(true)
                .setIncludeEntries(true);

        userSingleProperties = mappingService.createProperties(UserDto.Properties.class);

        activityEntrySingleProperties = mappingService.createProperties(ActivityEntryDto.Properties.class);
    }

    @GetMapping
    public ResponseEntity<Collection<ActivityRegistrationDto>> getAll(ActivityRegistrationFilter filter) {
        return ResponseEntity.ok(activityRegistrationFacade.map(activityRegistrationFacade.getList(filter), defaultListProperties));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActivityRegistrationDto> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(activityRegistrationFacade.getById(id, defaultSingleProperties));
    }

    @PostMapping("/{registrationId}/validate-entry/{userCode}")
    public ResponseEntity<UserDto> validateEntry(@PathVariable UUID registrationId, @PathVariable String userCode) {
        return ResponseEntity.ok(userFacade.map(activityRegistrationFacade.validateEntry(registrationId, userCode), userSingleProperties));
    }

    @PostMapping("/{id}")
    public ResponseEntity<ActivityEntryDto> createEntry(@PathVariable UUID id, @RequestBody ActivityEntryDto dto) {
        return ResponseEntity.ok(activityEntryFacade.map(activityEntryFacade.create(id, dto), activityEntrySingleProperties));
    }
}
