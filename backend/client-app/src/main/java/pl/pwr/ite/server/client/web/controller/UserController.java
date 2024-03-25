package pl.pwr.ite.server.client.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.pwr.ite.server.client.web.dto.UserDataDto;
import pl.pwr.ite.server.client.web.dto.UserDto;
import pl.pwr.ite.server.client.web.service.UserFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.service.MappingService;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController implements InitializingBean {

    private final UserFacade userFacade;

    private final MappingService mappingService;

    private MappingProperties defaultSingleProperties;
    private MappingProperties defaultListProperties;

    @Override
    public void afterPropertiesSet() throws Exception {
        defaultSingleProperties = mappingService.createProperties(UserDto.Properties.class)
                .setIncludeData(true)
                .as(UserDataDto.Properties.class)
                .setIncludeData(true)
                .setIncludeUser(false);

        defaultListProperties = mappingService.createProperties(UserDto.Properties.class)
                .setIncludeData(true)
                .as(UserDataDto.Properties.class)
                .setIncludeData(true)
                .setIncludeUser(false);
    }

    @GetMapping
    public ResponseEntity<UserDto> getAuthenticatedUser() {
        return ResponseEntity.ok(userFacade.map(userFacade.getAuthenticatedUser(), defaultSingleProperties));
    }

    @PostMapping("/import")
    public ResponseEntity<Collection<UserDto>> importUsers() {
        return ResponseEntity.ok(List.of(new UserDto()));
    }
}
