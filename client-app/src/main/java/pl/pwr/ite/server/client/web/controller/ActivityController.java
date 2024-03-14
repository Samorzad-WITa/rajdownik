package pl.pwr.ite.server.client.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.pwr.ite.server.client.web.dto.ActivityDto;
import pl.pwr.ite.server.client.web.service.ActivityFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.model.filter.ActivityFilter;
import pl.pwr.ite.server.service.MappingService;

import java.util.Collection;

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
        defaultListProperties = mappingService.createProperties(ActivityDto.Properties.class);
    }

    @GetMapping
    public ResponseEntity<Collection<ActivityDto>> getAll(ActivityFilter filter) {
        return ResponseEntity.ok(activityFacade.map(activityFacade.getAll(filter), defaultListProperties));
    }
}