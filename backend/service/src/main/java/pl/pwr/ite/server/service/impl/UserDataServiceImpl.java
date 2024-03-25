package pl.pwr.ite.server.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.UserData;
import pl.pwr.ite.server.model.repository.UserDataRepository;
import pl.pwr.ite.server.service.UserDataService;

import java.util.UUID;

@Service
public class UserDataServiceImpl extends EntityServiceBase<UserData> implements UserDataService {

    public UserDataServiceImpl(UserDataRepository repository) {
        super(repository);
    }
}
