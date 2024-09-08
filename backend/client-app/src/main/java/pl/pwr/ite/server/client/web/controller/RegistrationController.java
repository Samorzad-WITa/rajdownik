package pl.pwr.ite.server.client.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pwr.ite.server.client.web.dto.RegistrationDto;
import pl.pwr.ite.server.client.web.dto.RegistrationEntryDto;
import pl.pwr.ite.server.client.web.dto.RegistrationLockDto;
import pl.pwr.ite.server.client.web.dto.RegistrationPartDto;
import pl.pwr.ite.server.client.web.service.RegistrationEntryFacade;
import pl.pwr.ite.server.client.web.service.RegistrationFacade;
import pl.pwr.ite.server.client.web.service.RegistrationLockFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.service.MappingService;

import java.util.UUID;

@RestController
@RequestMapping("/registration")
@RequiredArgsConstructor
public class RegistrationController implements InitializingBean {

    private final RegistrationLockFacade registrationLockFacade;
    private final RegistrationEntryFacade registrationEntryFacade;
    private final RegistrationFacade registrationFacade;
    private final MappingService mappingService;

    private MappingProperties defaultSingleProperties;
    private MappingProperties defaultLockProperties;

    @Override
    public void afterPropertiesSet() throws Exception {
        defaultSingleProperties = mappingService.createProperties(RegistrationDto.Properties.class)
                .setIncludeParts(true)
                .as(RegistrationPartDto.Properties.class)
                .setIncludeLock(true)
                .setIncludeEntries(true);
        defaultLockProperties = mappingService.createProperties(RegistrationLockDto.Properties.class);
    }

    @GetMapping
    public ResponseEntity<RegistrationDto> get() {
        return ResponseEntity.ok(registrationFacade.map(registrationFacade.getService().getActive(), defaultSingleProperties));
    }

    @PostMapping("/lock-part/{partId}")
    public ResponseEntity<RegistrationLockDto> createLock(@PathVariable UUID partId) {
        return ResponseEntity.ok(registrationLockFacade.map(registrationFacade.createLock(partId), defaultLockProperties));
    }

    @PostMapping("/release-part/{partId}")
    @ResponseStatus(HttpStatus.OK)
    public void releaseLock(@PathVariable UUID partId) {
        registrationFacade.releaseLock(partId);
    }

    @PostMapping("/register-entry/{partId}")
    public ResponseEntity<RegistrationEntryDto> registerEntry(@PathVariable UUID partId, @RequestBody RegistrationEntryDto entryDto) {
        return ResponseEntity.ok(registrationEntryFacade.map(registrationFacade.registerEntry(partId, entryDto), defaultSingleProperties));
    }

    @DeleteMapping("/remove-entry/{entryId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteEntry(@PathVariable UUID entryId) {
        registrationFacade.removeEntry(entryId);
    }
}
