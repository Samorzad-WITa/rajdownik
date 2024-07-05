package pl.pwr.ite.server.admin.web.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import pl.pwr.ite.server.admin.web.dto.UserDto;
import pl.pwr.ite.server.admin.web.mapper.UserMapper;
import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.model.enums.Permission;
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

    public UserFacade(UserService service, UserMapper mapper, SecurityFacade securityFacade, UserImporter userImporter) {
        super(service, mapper, securityFacade);
        this.userImporter = userImporter;
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
