package pl.pwr.ite.server.admin.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.pwr.ite.server.admin.web.dto.CredentialsDto;
import pl.pwr.ite.server.admin.web.dto.JwtDto;
import pl.pwr.ite.server.admin.web.service.UserFacade;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController implements InitializingBean {

    private final UserFacade userFacade;

    @Override
    public void afterPropertiesSet() throws Exception {

    }

    @PostMapping("/auth/login")
    public ResponseEntity<JwtDto> login(@RequestBody CredentialsDto dto) {
        return ResponseEntity.ok(userFacade.authenticate(dto));
    }
}
