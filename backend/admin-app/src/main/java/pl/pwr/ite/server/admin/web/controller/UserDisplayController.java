package pl.pwr.ite.server.admin.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pwr.ite.server.admin.web.dto.UserDisplayDto;
import pl.pwr.ite.server.admin.web.dto.UserDto;
import pl.pwr.ite.server.admin.web.service.UserDisplayFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.model.filter.UserDisplayFilter;
import pl.pwr.ite.server.service.MappingService;

import java.util.Collection;
import java.util.UUID;

@RestController
@RequestMapping("/user-display")
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

    @GetMapping("/{id}")
    public ResponseEntity<UserDisplayDto> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(userDisplayFacade.getById(id, defaultSingleProperties));
    }

    @GetMapping
    public ResponseEntity<Collection<UserDisplayDto>> getAll(UserDisplayFilter filter) {
        return ResponseEntity.ok(userDisplayFacade.getList(filter, defaultListProperties));
    }

    @PostMapping
    public ResponseEntity<UserDisplayDto> create(@RequestBody UserDisplayDto dto) {
        return ResponseEntity.ok(userDisplayFacade.map(userDisplayFacade.create(dto), defaultSingleProperties));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDisplayDto> update(@PathVariable UUID id, @RequestBody UserDisplayDto dto) {
        return ResponseEntity.ok(userDisplayFacade.map(userDisplayFacade.update(id, dto), defaultSingleProperties));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void delete(@PathVariable UUID id) {
        userDisplayFacade.delete(id);
    }
}
