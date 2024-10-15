package pl.pwr.ite.server.client.web.controller;

import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.parser.HttpParser;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.pwr.ite.server.client.web.dto.*;
import pl.pwr.ite.server.client.web.service.UserFacade;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.service.MappingService;

import java.util.Collection;
import java.util.List;
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
        defaultSingleProperties = mappingService.createProperties(UserDto.Properties.class)
                .setIncludeData(false)
                .setIncludeDetails(true)
                .setIncludeActivityEntries(true)
                .as(UserDataDto.Properties.class)
                .setIncludeData(true)
                .setIncludeUser(false)
                .as(ActivityEntryDto.Properties.class)
                .setIncludeActivityRegistration(true);

        defaultListProperties = mappingService.createProperties(UserDto.Properties.class)
                .setIncludeData(false)
                .setIncludeDetails(true)
                .as(UserDataDto.Properties.class)
                .setIncludeData(true)
                .setIncludeUser(false);
    }

    @GetMapping("/authenticated")
    public ResponseEntity<UserDto> getAuthenticatedUser() {
        return ResponseEntity.ok(userFacade.map(userFacade.getAuthenticatedUser(), defaultSingleProperties));
    }

    @PostMapping("/password-reset-init")
    public ResponseEntity<Void> initPasswordReset(@RequestBody UserDto dto) {
        userFacade.initPasswordReset(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/password-reset")
    public ResponseEntity<Void> resetPassword(@RequestBody PasswordResetDto dto) {
        userFacade.resetPassword(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/import")
    public ResponseEntity<Collection<UserDto>> importUsers(@RequestPart(name = "file") MultipartFile file) {
        var users = userFacade.performImport(file);
        return ResponseEntity.ok(userFacade.map(users, defaultListProperties));
    }

    @GetMapping("/send-emails")
    public ResponseEntity<Integer> sendEmails() {
        userFacade.sendMails();
        return ResponseEntity.ok(2);
    }
}
