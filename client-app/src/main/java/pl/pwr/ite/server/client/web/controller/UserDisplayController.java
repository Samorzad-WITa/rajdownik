package pl.pwr.ite.server.client.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.pwr.ite.server.client.web.dto.UserDisplayDto;
import pl.pwr.ite.server.client.web.service.UserDisplayFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.service.MappingService;

import java.util.Collection;

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

    @GetMapping
    public ResponseEntity<Collection<UserDisplayDto>> getAll() {
        return ResponseEntity.ok(userDisplayFacade.map(userDisplayFacade.getAll(), defaultListProperties));
    }
}
