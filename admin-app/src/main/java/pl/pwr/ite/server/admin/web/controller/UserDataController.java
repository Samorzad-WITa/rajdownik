package pl.pwr.ite.server.admin.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pwr.ite.server.admin.web.dto.ActivityDto;
import pl.pwr.ite.server.admin.web.dto.UserDataDto;
import pl.pwr.ite.server.admin.web.service.UserDataFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.service.MappingService;

import java.util.UUID;

@RestController
@RequestMapping("/user-data")
@RequiredArgsConstructor
public class UserDataController implements InitializingBean {

    private final UserDataFacade userDataFacade;
    private final MappingService mappingService;

    private MappingProperties defaultSingleProperties;
    private MappingProperties defaultListProperties;

    @Override
    public void afterPropertiesSet() throws Exception {
        defaultSingleProperties = mappingService.createProperties(UserDataDto.Properties.class)
                .setIncludeData(true)
                .setIncludeUser(true);

        defaultListProperties = mappingService.createProperties(UserDataDto.Properties.class)
                .setIncludeUser(true)
                .setIncludeUser(true);
    }

    @PostMapping
    public ResponseEntity<UserDataDto> create(@RequestBody UserDataDto dto) {
        return ResponseEntity.ok(userDataFacade.map(userDataFacade.create(dto), defaultSingleProperties));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDataDto> update(@PathVariable UUID id, @RequestBody UserDataDto dto) {
        return ResponseEntity.ok(userDataFacade.map(userDataFacade.update(id, dto), defaultSingleProperties));
    }
}
