package pl.pwr.ite.server.client.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pwr.ite.server.client.web.dto.UserDisplayDto;
import pl.pwr.ite.server.client.web.service.UserDisplayFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.service.MappingService;

import java.util.Collection;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class UserDisplayController implements InitializingBean {

    private final UserDisplayFacade userDisplayFacade;
    private final MappingService mappingService;

    private MappingProperties defaultSingleProperties;
    private MappingProperties defaultListProperties;

    @Override
    public void afterPropertiesSet() throws Exception {
        defaultSingleProperties = mappingService.createProperties(UserDisplayDto.Properties.class)
                .setIncludeUser(true);
        defaultListProperties = mappingService.createProperties(UserDisplayDto.Properties.class)
                .setIncludeUser(true);
    }

    @GetMapping("/api/user-display")
    public ResponseEntity<Collection<UserDisplayDto>> getAll() {
        return ResponseEntity.ok(userDisplayFacade.map(userDisplayFacade.getAll(), defaultListProperties));
    }

    @PostMapping("/admin/user-display")
    public ResponseEntity<UserDisplayDto> create(@RequestBody UserDisplayDto dto) {
        return ResponseEntity.ok(userDisplayFacade.map(userDisplayFacade.create(dto), defaultSingleProperties));
    }
}
