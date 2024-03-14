package pl.pwr.ite.server.admin.web.service;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pl.pwr.ite.server.admin.web.dto.UserDataDto;
import pl.pwr.ite.server.admin.web.mapper.UserDataMapper;
import pl.pwr.ite.server.model.entity.UserData;
import pl.pwr.ite.server.service.DataService;
import pl.pwr.ite.server.service.UserDataService;
import pl.pwr.ite.server.service.UserService;
import pl.pwr.ite.server.web.EntityServiceFacade;
import pl.pwr.ite.server.web.exception.ApplicationError;
import pl.pwr.ite.server.web.exception.ApplicationException;

import java.util.UUID;

@Component
public class UserDataFacade extends EntityServiceFacade<UserData, UserDataService, UserDataDto, UserDataDto.Properties, UserDataMapper> {

    private final UserService userService;
    private final DataService dataService;

    public UserDataFacade(UserDataService service, UserDataMapper mapper, UserService userService, DataService dataService) {
        super(service, mapper);
        this.userService = userService;
        this.dataService = dataService;
    }

    @Transactional
    public UserData create(UserDataDto dto) {
        var userData = new UserData();
        var user = userService.findById(dto.getUser().getId());
        if(user == null) {
            throw new ApplicationException(ApplicationError.UserNotFound);
        }
        var data = dataService.findById(dto.getData().getId());
        if(data == null) {
            throw new ApplicationException(ApplicationError.DataNotFound);
        }

        userData.setValue(dto.getValue());
        userData.setData(data);
        userData.setUser(user);

        return saveAndFlush(userData);
    }

    @Transactional
    public UserData update(UUID userDataId, UserDataDto dto) {
        var userData = getService().findById(userDataId);
        if(userData == null) {
            throw new ApplicationException(ApplicationError.UserDataNotFound);
        }
        userData.setValue(dto.getValue());

        return saveAndFlush(userData);
    }
}
