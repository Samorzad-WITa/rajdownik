package pl.pwr.ite.server.client.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pwr.ite.server.client.web.dto.ActivityDto;
import pl.pwr.ite.server.client.web.dto.AnnouncementDto;
import pl.pwr.ite.server.client.web.service.AnnouncementFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.model.filter.AnnouncementFilter;
import pl.pwr.ite.server.service.MappingService;

import java.util.Collection;
import java.util.UUID;

@RestController
@RequestMapping("/announcement")
@RequiredArgsConstructor
public class AnnouncementController implements InitializingBean {

    private final AnnouncementFacade announcementFacade;
    private final MappingService mappingService;

    private MappingProperties defaultListProperties;
    private MappingProperties defaultSingleProperties;

    @Override
    public void afterPropertiesSet() throws Exception {
        defaultListProperties = mappingService.createProperties(AnnouncementDto.Properties.class);
        
        defaultSingleProperties = mappingService.createProperties(AnnouncementDto.Properties.class)
                .setIncludeDescription(true);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnnouncementDto> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(announcementFacade.getById(id, defaultSingleProperties));
    }

    @GetMapping
    public ResponseEntity<Collection<AnnouncementDto>> getAll(AnnouncementFilter filter) {
        return ResponseEntity.ok(announcementFacade.getList(filter, defaultListProperties));
    }
}
