package pl.pwr.ite.server.service;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pwr.ite.server.model.entity.UserData;

import java.util.UUID;

public interface UserDataService extends EntityService<UserData> {
}
