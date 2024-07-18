package pl.pwr.ite.server.admin.web.service;

import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import pl.pwr.ite.server.admin.web.dto.CredentialsDto;
import pl.pwr.ite.server.admin.web.dto.JwtDto;
import pl.pwr.ite.server.admin.web.dto.UserDto;
import pl.pwr.ite.server.admin.web.mapper.UserMapper;
import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.model.enums.Permission;
import pl.pwr.ite.server.security.AuthenticatedUser;
import pl.pwr.ite.server.service.JwtService;
import pl.pwr.ite.server.service.UserImporter;
import pl.pwr.ite.server.service.UserService;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;
import pl.pwr.ite.server.web.exception.ApplicationError;
import pl.pwr.ite.server.web.exception.ApplicationException;

import java.io.IOException;
import java.util.Collection;
import java.util.UUID;

@Component
public class UserFacade extends EntityServiceFacade<User, UserService, UserDto, UserDto.Properties, UserMapper> {

    private final UserImporter userImporter;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public UserFacade(UserService service, UserMapper mapper, SecurityFacade securityFacade, UserImporter userImporter, JwtService jwtService, AuthenticationManager authenticationManager) {
        super(service, mapper, securityFacade);
        this.userImporter = userImporter;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Transactional
    public User create(UserDto dto) {
        securityFacade.checkAccess(Permission.UserEdit);

        var user = new User();

        return saveAndFlush(user);
    }

    @Transactional
    public User update(UUID id, UserDto dto) {
        var user = getById(id);
        if(user == null) {
            throw new ApplicationException(ApplicationError.UserNotFound);
        }
        securityFacade.checkAccess(Permission.UserEdit);

        return saveAndFlush(user);
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
    public Collection<User> performImport(MultipartFile multipartFile) {
        securityFacade.checkAccess(Permission.UserImport);
        try(var inputStream = multipartFile.getInputStream()) {
            return userImporter.performImport(inputStream);
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return null;
    }
}
