package pl.pwr.ite.server.client.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.pwr.ite.server.client.web.dto.ActivityRegistrationDto;
import pl.pwr.ite.server.client.web.service.ActivityRegistrationFacade;
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
    private final MappingService mappingService;

    private MappingProperties defaultListProperties;
    private MappingProperties defaultSingleProperties;

    @Override
    public void afterPropertiesSet() throws Exception {
        defaultListProperties = mappingService.createProperties(ActivityRegistrationDto.Properties.class);

        defaultSingleProperties = mappingService.createProperties(ActivityRegistrationDto.Properties.class)
                .setIncludeDetails(true)
                .setIncludeEntries(true);
    }

    @GetMapping
    public ResponseEntity<Collection<ActivityRegistrationDto>> getAll(ActivityRegistrationFilter filter) {
        return ResponseEntity.ok(activityRegistrationFacade.map(activityRegistrationFacade.getList(filter), defaultListProperties));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActivityRegistrationDto> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(activityRegistrationFacade.getById(id, defaultSingleProperties));
    }
}
