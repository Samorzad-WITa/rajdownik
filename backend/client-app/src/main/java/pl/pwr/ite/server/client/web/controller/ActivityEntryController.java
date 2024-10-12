package pl.pwr.ite.server.client.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.pwr.ite.server.client.web.dto.ActivityEntryDto;
import pl.pwr.ite.server.client.web.dto.ActivityEntryUserDto;
import pl.pwr.ite.server.client.web.dto.ActivityRegistrationDto;
import pl.pwr.ite.server.client.web.service.ActivityEntryFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.service.MappingService;

import java.util.UUID;

@RestController
@RequestMapping("/activity-entry")
@RequiredArgsConstructor
public class ActivityEntryController implements InitializingBean {

    private final ActivityEntryFacade activityEntryFacade;
    private final MappingService mappingService;

    private MappingProperties defaultListProperties;
    private MappingProperties defaultSingleProperties;

    @Override
    public void afterPropertiesSet() throws Exception {
        defaultListProperties = mappingService.createProperties(ActivityEntryDto.Properties.class);

        defaultSingleProperties = mappingService.createProperties(ActivityEntryDto.Properties.class)
                .setIncludeActivityRegistration(true)
                .setIncludeTeamCaptain(true)
                .setIncludeUsers(true)
                .as(ActivityEntryUserDto.Properties.class)
                .setIncludeUser(true)
                .as(ActivityRegistrationDto.Properties.class)
                .setIncludeDetails(true);
    }

    @GetMapping("/{registrationId}")
    public ResponseEntity<ActivityEntryDto> getByRegistrationId(@PathVariable UUID registrationId) {
        return ResponseEntity.ok(activityEntryFacade.map(activityEntryFacade.getByRegistrationAndUserId(registrationId), defaultSingleProperties));
    }
}
