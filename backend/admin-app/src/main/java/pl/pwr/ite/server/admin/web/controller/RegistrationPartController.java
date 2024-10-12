package pl.pwr.ite.server.admin.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import pl.pwr.ite.server.admin.web.dto.RegistrationPartDto;
import pl.pwr.ite.server.admin.web.service.RegistrationPartFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.model.filter.RegistrationPartFilter;
import pl.pwr.ite.server.service.MappingService;
import pl.pwr.ite.server.web.PageDto;

import java.util.Collection;
import java.util.UUID;

@RestController
@RequestMapping("/registration-part")
@RequiredArgsConstructor
public class RegistrationPartController implements InitializingBean {

    private final RegistrationPartFacade registrationPartFacade;

    private final MappingService mappingService;

    private MappingProperties defaultSingleProperties;
    private MappingProperties defaultListProperties;

    @Override
    public void afterPropertiesSet() throws Exception {
        defaultSingleProperties = mappingService.createProperties(RegistrationPartDto.Properties.class)
                .setIncludeRegistration(true)
                .setIncludeLock(true)
                .setIncludeEntries(true);
        defaultListProperties = mappingService.createProperties(RegistrationPartDto.Properties.class)
                .setIncludeRegistration(true)
                .setIncludeLock(true)
                .setIncludeEntries(true);
    }

    @GetMapping
    public ResponseEntity<Collection<RegistrationPartDto>> getAll(RegistrationPartFilter filter) {
        return ResponseEntity.ok(registrationPartFacade.getList(filter, defaultListProperties));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegistrationPartDto> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(registrationPartFacade.getById(id, defaultListProperties));
    }

    @PostMapping
    public ResponseEntity<RegistrationPartDto> create(@RequestBody RegistrationPartDto dto) {
        return ResponseEntity.ok(registrationPartFacade.map(registrationPartFacade.create(dto), defaultSingleProperties));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RegistrationPartDto> update(@PathVariable UUID id, @RequestBody RegistrationPartDto dto) {
        return ResponseEntity.ok(registrationPartFacade.map(registrationPartFacade.update(id, dto), defaultSingleProperties));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void delete(@PathVariable UUID id) {
        registrationPartFacade.delete(id);
    }
}
