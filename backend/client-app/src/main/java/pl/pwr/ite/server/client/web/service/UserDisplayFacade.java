package pl.pwr.ite.server.client.web.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.UserDisplayDto;
import pl.pwr.ite.server.client.web.mapper.UserDisplayMapper;
import pl.pwr.ite.server.model.entity.UserDisplay;
import pl.pwr.ite.server.model.enums.Permission;
import pl.pwr.ite.server.model.filter.UserDisplayFilter;
import pl.pwr.ite.server.service.ClockService;
import pl.pwr.ite.server.service.UserDisplayService;
import pl.pwr.ite.server.service.UserService;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.SecurityFacade;
import pl.pwr.ite.server.web.exception.ApplicationError;
import pl.pwr.ite.server.web.exception.ApplicationException;

import java.util.Collection;
import java.util.UUID;

@Component
public class UserDisplayFacade extends EntityServiceFacade<UserDisplay, UserDisplayFilter, UserDisplayService, UserDisplayDto, UserDisplayDto.Properties, UserDisplayMapper> {

    private final ClockService clockService;
    private final UserService userService;

    public UserDisplayFacade(UserDisplayService service, UserDisplayMapper mapper, ClockService clockService, UserService userService, SecurityFacade securityFacade) {
        super(service, mapper, securityFacade);
        this.clockService = clockService;
        this.userService = userService;
    }

    @Transactional
    public Collection<UserDisplay> getAll() {
        var currentTime = clockService.getCurrentTime();
        return getService().getAllActive(currentTime);
    }
}
