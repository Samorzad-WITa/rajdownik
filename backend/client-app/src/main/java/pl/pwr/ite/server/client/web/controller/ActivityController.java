package pl.pwr.ite.server.client.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pwr.ite.server.client.web.dto.ActivityDto;
import pl.pwr.ite.server.client.web.service.ActivityFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.model.entity.Activity;
import pl.pwr.ite.server.model.filter.ActivityFilter;
import pl.pwr.ite.server.service.MappingService;

import java.util.Collection;
import java.util.UUID;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class ActivityController implements InitializingBean {

    private final ActivityFacade activityFacade;
    private final MappingService mappingService;

    private MappingProperties defaultSingleProperties;
    private MappingProperties defaultListProperties;

    @Override
    public void afterPropertiesSet() throws Exception {
        defaultSingleProperties = mappingService.createProperties(ActivityDto.Properties.class)
                .setIncludeDescription(true);
        defaultListProperties = mappingService.createProperties(ActivityDto.Properties.class)
                .setIncludeDescription(true);
    }

    @GetMapping("/api/activity")
    public ResponseEntity<Collection<ActivityDto>> getAll(/*ActivityFilter filter*/) {
        return ResponseEntity.ok(activityFacade.map(activityFacade.getAll(/*filter*/), defaultListProperties));
    }

    @GetMapping("/api/activity/{id}")
    public ResponseEntity<ActivityDto> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(activityFacade.getById(id, defaultSingleProperties));
    }

    @PostMapping("/admin/activity")
    public ResponseEntity<ActivityDto> create(@RequestBody ActivityDto dto) {
        return ResponseEntity.ok(activityFacade.map(activityFacade.create(dto), defaultSingleProperties));
    }

    @PutMapping("/admin/activity/{id}")
    public ResponseEntity<ActivityDto> update(@PathVariable UUID id, @RequestBody ActivityDto dto) {
        return ResponseEntity.ok(activityFacade.map(activityFacade.update(id, dto), defaultSingleProperties));
    }

    @DeleteMapping("/admin/activity/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void delete(@PathVariable UUID id) {
        activityFacade.delete(id);
    }
}
