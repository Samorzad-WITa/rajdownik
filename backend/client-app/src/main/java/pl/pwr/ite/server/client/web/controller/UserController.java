package pl.pwr.ite.server.client.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.pwr.ite.server.client.web.dto.PasswordResetDto;
import pl.pwr.ite.server.client.web.dto.UserDataDto;
import pl.pwr.ite.server.client.web.dto.UserDisplayDto;
import pl.pwr.ite.server.client.web.dto.UserDto;
import pl.pwr.ite.server.client.web.service.UserFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.service.MappingService;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class UserController implements InitializingBean {

    private final UserFacade userFacade;

    private final MappingService mappingService;

    private MappingProperties defaultSingleProperties;
    private MappingProperties defaultListProperties;

    @Override
    public void afterPropertiesSet() throws Exception {
        defaultSingleProperties = mappingService.createProperties(UserDto.Properties.class)
                .setIncludeData(false)
                .setIncludeDetails(true)
                .as(UserDataDto.Properties.class)
                .setIncludeData(true)
                .setIncludeUser(false);

        defaultListProperties = mappingService.createProperties(UserDto.Properties.class)
                .setIncludeData(false)
                .setIncludeDetails(true)
                .as(UserDataDto.Properties.class)
                .setIncludeData(true)
                .setIncludeUser(false);
    }

    @GetMapping("/admin/user")
    public ResponseEntity<UserDto> getAuthenticatedUser() {
        return ResponseEntity.ok(userFacade.map(userFacade.getAuthenticatedUser(), defaultSingleProperties));
    }

    @GetMapping("/admin/user/all")
    public ResponseEntity<Collection<UserDto>> getAll() {
        return ResponseEntity.ok(userFacade.map(userFacade.getService().getAll(), defaultListProperties));
    }

    @PostMapping("/admin/user")
    public ResponseEntity<UserDto> create(@RequestBody UserDto dto) {
        return ResponseEntity.ok(userFacade.map(userFacade.create(dto), defaultSingleProperties));
    }

    @PutMapping("/admin/user/{id}")
    public ResponseEntity<UserDto> update(@PathVariable UUID id, @RequestBody UserDto dto) {
        return ResponseEntity.ok(userFacade.map(userFacade.update(id, dto), defaultSingleProperties));
    }

    @PostMapping("/admin/user/import")
    public ResponseEntity<Collection<UserDto>> importUsers(@RequestPart(name = "file") MultipartFile file) {
        var users = userFacade.performImport(file);
        return ResponseEntity.ok(userFacade.map(users, defaultListProperties));
    }

    @PostMapping("/admin/user/password-reset-init")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void initPasswordReset(@RequestBody UserDto dto) {
        userFacade.initPasswordReset(dto);
    }

    @PostMapping("/admin/user/password-reset")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void resetPassword(@RequestBody PasswordResetDto dto) {
        userFacade.resetPassword(dto);
    }
}
