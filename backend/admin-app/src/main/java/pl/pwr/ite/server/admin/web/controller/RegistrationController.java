package pl.pwr.ite.server.admin.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pwr.ite.server.admin.web.dto.RegistrationDto;
import pl.pwr.ite.server.admin.web.dto.RegistrationPartDto;
import pl.pwr.ite.server.admin.web.service.RegistrationFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.model.filter.RegistrationFilter;
import pl.pwr.ite.server.service.MappingService;

import java.util.Collection;
import java.util.UUID;

@RestController
@RequestMapping("/registration")
@RequiredArgsConstructor
public class RegistrationController implements InitializingBean {

    private final RegistrationFacade registrationFacade;

    private final MappingService mappingService;

    private MappingProperties defaultSingleProperties;

    private MappingProperties defaultListProperties;

    @Override
    public void afterPropertiesSet() throws Exception {
        defaultSingleProperties = mappingService.createProperties(RegistrationDto.Properties.class)
                .setIncludeParts(true)
                .as(RegistrationPartDto.Properties.class)
                .setIncludeEntries(true)
                .setIncludeLock(true);
        defaultListProperties = mappingService.createProperties(RegistrationDto.Properties.class)
                .setIncludeParts(true)
                .as(RegistrationPartDto.Properties.class)
                .setIncludeEntries(true)
                .setIncludeLock(true);
    }

    @GetMapping
    public ResponseEntity<Collection<RegistrationDto>> getAll(RegistrationFilter filter) {
        return ResponseEntity.ok(registrationFacade.getList(filter, defaultListProperties));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegistrationDto> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(registrationFacade.getById(id, defaultSingleProperties));
    }

    @PostMapping
    public ResponseEntity<RegistrationDto> create(@RequestBody RegistrationDto dto) {
        return ResponseEntity.ok(registrationFacade.map(registrationFacade.create(dto), defaultSingleProperties));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RegistrationDto> update(@PathVariable UUID id, @RequestBody RegistrationDto dto) {
        return ResponseEntity.ok(registrationFacade.map(registrationFacade.update(id, dto), defaultSingleProperties));
    }
}
