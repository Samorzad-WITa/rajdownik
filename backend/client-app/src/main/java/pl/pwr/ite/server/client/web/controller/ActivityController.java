package pl.pwr.ite.server.client.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pwr.ite.server.client.web.dto.ActivityDto;
import pl.pwr.ite.server.client.web.service.ActivityFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.model.filter.ActivityFilter;
import pl.pwr.ite.server.model.filter.Filter;
import pl.pwr.ite.server.service.MappingService;

import java.util.Collection;
import java.util.UUID;

@RestController
@RequestMapping("/activity")
@RequiredArgsConstructor
public class ActivityController implements InitializingBean {

    private final ActivityFacade activityFacade;
    private final MappingService mappingService;

    private MappingProperties defaultSingleProperties;
    private MappingProperties defaultListProperties;

    @Override
    public void afterPropertiesSet() throws Exception {
        defaultSingleProperties = mappingService.createProperties(ActivityDto.Properties.class);
        defaultListProperties = mappingService.createProperties(ActivityDto.Properties.class)
                .setIncludeActivityRegistration(true);
    }

    @GetMapping
    public ResponseEntity<Collection<ActivityDto>> getAll(ActivityFilter filter) {
        filter.setSortSchema("timeFrom");
        filter.setSortDirection("DESC");
        return ResponseEntity.ok(activityFacade.getList(filter, defaultListProperties));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActivityDto> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(activityFacade.getById(id, defaultSingleProperties));
    }
}
