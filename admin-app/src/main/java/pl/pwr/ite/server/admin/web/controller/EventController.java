package pl.pwr.ite.server.admin.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pwr.ite.server.admin.web.dto.ActivityDto;
import pl.pwr.ite.server.admin.web.dto.EventDto;
import pl.pwr.ite.server.admin.web.dto.UserDataDto;
import pl.pwr.ite.server.admin.web.service.EventFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.service.MappingService;

import java.util.UUID;

@RestController
@RequestMapping("/event")
@RequiredArgsConstructor
public class EventController implements InitializingBean {

    private final EventFacade eventFacade;
    private final MappingService mappingService;

    private MappingProperties defaultSingleProperties;
    private MappingProperties defaultListProperties;

    @Override
    public void afterPropertiesSet() throws Exception {
        defaultSingleProperties = mappingService.createProperties(EventDto.Properties.class);
        defaultListProperties = mappingService.createProperties(EventDto.Properties.class);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDto> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(eventFacade.getById(id, defaultSingleProperties));
    }

    @PostMapping
    public ResponseEntity<EventDto> create(@RequestBody EventDto dto) {
        return ResponseEntity.ok(eventFacade.map(eventFacade.create(dto), defaultSingleProperties));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDto> update(@PathVariable UUID id, @RequestBody EventDto dto) {
        return ResponseEntity.ok(eventFacade.map(eventFacade.update(id, dto), defaultSingleProperties));
    }
}
