package pl.pwr.ite.server.client.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.pwr.ite.server.client.web.dto.CredentialsDto;
import pl.pwr.ite.server.client.web.dto.JwtDto;
import pl.pwr.ite.server.client.web.dto.UserDto;
import pl.pwr.ite.server.client.web.service.UserFacade;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserFacade userFacade;

    @PostMapping("/login")
    public ResponseEntity<JwtDto> login(@RequestBody CredentialsDto dto) {
        return ResponseEntity.ok(userFacade.authenticate(dto));
    }
}
