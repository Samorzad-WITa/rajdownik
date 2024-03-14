package pl.pwr.ite.server.client.web.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.UserDisplayDto;
import pl.pwr.ite.server.client.web.mapper.UserDisplayMapper;
import pl.pwr.ite.server.model.entity.UserDisplay;
import pl.pwr.ite.server.service.ClockService;
import pl.pwr.ite.server.service.UserDisplayService;
import pl.pwr.ite.server.web.EntityServiceFacade;

import java.util.Collection;

@Component
public class UserDisplayFacade extends EntityServiceFacade<UserDisplay, UserDisplayService, UserDisplayDto, UserDisplayDto.Properties, UserDisplayMapper> {

    private final ClockService clockService;

    public UserDisplayFacade(UserDisplayService service, UserDisplayMapper mapper, ClockService clockService) {
        super(service, mapper);
        this.clockService = clockService;
    }

    @Transactional
    public Collection<UserDisplay> getAll() {
        var currentTime = clockService.getCurrentTime();
        return getService().getAllActive(currentTime);
    }
}
