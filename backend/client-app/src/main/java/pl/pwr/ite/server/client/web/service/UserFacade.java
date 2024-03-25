package pl.pwr.ite.server.client.web.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.UserDto;
import pl.pwr.ite.server.client.web.mapper.UserMapper;
import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.service.UserService;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;

import java.util.UUID;

@Component
public class UserFacade extends EntityServiceFacade<User, UserService, UserDto, UserDto.Properties, UserMapper> {

    private final SecurityFacade securityFacade;

    public UserFacade(UserService service, UserMapper mapper, SecurityFacade securityFacade) {
        super(service, mapper);
        this.securityFacade = securityFacade;
    }

    @Transactional
    public User getAuthenticatedUser() {
//        var authenticatedUser = securityFacade.getAuthenticatedUser();
        var user = getService().findById(/*authenticatedUser.getId()*/UUID.fromString("238bdf45-c2a0-4feb-811f-18572227c3b3"));
        return user;
    }
}
