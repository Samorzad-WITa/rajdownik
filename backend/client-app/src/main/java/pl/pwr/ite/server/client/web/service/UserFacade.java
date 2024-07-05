package pl.pwr.ite.server.client.web.service;

import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import pl.pwr.ite.server.client.web.dto.CredentialsDto;
import pl.pwr.ite.server.client.web.dto.JwtDto;
import pl.pwr.ite.server.client.web.dto.PasswordResetDto;
import pl.pwr.ite.server.client.web.dto.UserDto;
import pl.pwr.ite.server.client.web.mapper.UserMapper;
import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.model.entity.UserToken;
import pl.pwr.ite.server.model.enums.Permission;
import pl.pwr.ite.server.model.enums.UserTokenType;
import pl.pwr.ite.server.model.enums.UserType;
import pl.pwr.ite.server.security.AuthenticatedUser;
import pl.pwr.ite.server.service.*;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;
import pl.pwr.ite.server.web.exception.ApplicationError;
import pl.pwr.ite.server.web.exception.ApplicationException;

import java.io.IOException;
import java.util.Collection;
import java.util.UUID;

@Component
public class UserFacade extends EntityServiceFacade<User, UserService, UserDto, UserDto.Properties, UserMapper> {

    private final MailingService mailingService;
    private final ClockService clockService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserTokenService userTokenService;

    public UserFacade(UserService service, UserMapper mapper, MailingService mailingService, ClockService clockService, SecurityFacade securityFacade, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService, UserTokenService userTokenService) {
        super(service, mapper, securityFacade);
        this.mailingService = mailingService;
        this.clockService = clockService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userTokenService = userTokenService;
    }

    @Transactional
    public JwtDto authenticate(CredentialsDto dto) {
        try {
            var token = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
            var auth = (UsernamePasswordAuthenticationToken) authenticationManager.authenticate(token);
            SecurityContextHolder.getContext().setAuthentication(auth);

            var accessToken = jwtService.generateToken((AuthenticatedUser) auth.getPrincipal());
            var jwtDto = new JwtDto();
            jwtDto.setToken(accessToken);
            jwtDto.setExpiresIn(jwtService.getExpirationTime());
            return jwtDto;
        } catch (AuthenticationException ex) {
            throw new IllegalStateException(ex);
        }
    }

    @Transactional
    public void initPasswordReset(UserDto userDto) {
        var user  = getService().findByEmail(userDto.getEmail());
        if(user == null) {
            throw new ApplicationException(ApplicationError.UserNotFound);
        }
        var token = userTokenService.generateToken(user);
        var userToken = new UserToken();
        userToken.setUser(user);
        userToken.setToken(token);
        userToken.setType(UserTokenType.PasswordReset);
        userToken.setExpiryTime(clockService.getCurrentTime().plusDays(7));
        userTokenService.saveAndFlush(userToken);
        sendPasswordResetMail(userToken);
    }

    private void sendPasswordResetMail(UserToken userToken) {
        var subject = "Zmiana hasła do aplikacji rajdownik.";
        var content = "Link do zmiany hasła w aplikacji Rajdownik\n\n http://localhost:1144/user/password-reset?token=" + userToken.getToken();
        mailingService.send(subject, content, userToken.getUser());
    }

    @Transactional
    public void resetPassword(PasswordResetDto dto) {
        var userToken = userTokenService.findByToken(dto.getToken(), clockService.getCurrentTime());
        if(userToken == null) {
            throw new ApplicationException(ApplicationError.UserTokenNotFound);
        }
        var user = userToken.getUser();
        var encodedPassword = passwordEncoder.encode(dto.getNewPassword());
        user.setPasswordHash(encodedPassword);
        userTokenService.deleteById(userToken.getId());
    }
}
