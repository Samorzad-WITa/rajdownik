package pl.pwr.ite.server.admin.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.pwr.ite.server.admin.web.dto.UserDto;
import pl.pwr.ite.server.admin.web.service.UserFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.service.MappingService;

import java.util.Collection;
import java.util.UUID;

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
        defaultSingleProperties = mappingService.createProperties(UserDto.Properties.class);
        defaultListProperties = mappingService.createProperties(UserDto.Properties.class);
    }

    @GetMapping
    public ResponseEntity<Collection<UserDto>> getAll() {
        return ResponseEntity.ok(userFacade.getList(defaultListProperties));
    }

    @PostMapping
    public ResponseEntity<UserDto> create(@RequestBody UserDto dto) {
        return ResponseEntity.ok(userFacade.map(userFacade.create(dto), defaultSingleProperties));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> update(@PathVariable UUID id, @RequestBody UserDto dto) {
        return ResponseEntity.ok(userFacade.map(userFacade.update(id, dto), defaultSingleProperties));
    }

    @PostMapping("/admin/user/import")
    public ResponseEntity<Collection<UserDto>> importUsers(@RequestPart(name = "file") MultipartFile file) {
        var users = userFacade.performImport(file);
        return ResponseEntity.ok(userFacade.map(users, defaultListProperties));
    }
}
