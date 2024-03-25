package pl.pwr.ite.server.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.Data;
import pl.pwr.ite.server.model.repository.DataRepository;
import pl.pwr.ite.server.service.DataService;

import java.util.UUID;

@Service
public class DataServiceImpl extends EntityServiceBase<Data> implements DataService {

    public DataServiceImpl(DataRepository repository) {
        super(repository);
    }
}
