package pl.pwr.ite.server.client.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pwr.ite.server.client.web.dto.RegistrationDto;
import pl.pwr.ite.server.client.web.dto.RegistrationPartDto;
import pl.pwr.ite.server.client.web.service.RegistrationPartFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.service.MappingService;

import java.util.UUID;

@RestController
@RequestMapping("/registration-part")
@RequiredArgsConstructor
public class RegistrationPartController implements InitializingBean {

    private final RegistrationPartFacade registrationPartFacade;
    private final MappingService mappingService;

    private MappingProperties defaultSingleProperties;

    @Override
    public void afterPropertiesSet() throws Exception {
        defaultSingleProperties = mappingService.createProperties(RegistrationPartDto.Properties.class)
                .setIncludeEntries(true)
                .setIncludeLock(true);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegistrationPartDto> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(registrationPartFacade.getById(id, defaultSingleProperties));
    }
}
