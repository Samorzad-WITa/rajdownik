package pl.pwr.ite.server.admin.web.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.pwr.ite.server.admin.web.dto.DataDto;
import pl.pwr.ite.server.admin.web.mapper.DataMapper;
import pl.pwr.ite.server.model.entity.Data;
import pl.pwr.ite.server.service.DataService;
import pl.pwr.ite.server.web.EntityServiceFacade;

@Service
public class DataFacade extends EntityServiceFacade<Data, DataService, DataDto, DataDto.Properties, DataMapper> {
    public DataFacade(DataService service, DataMapper mapper) {
        super(service, mapper);
    }

    @Transactional
    public Data create(DataDto dto) {
        var data = new Data();
        data.setLabel(dto.getLabel());
        return saveAndFlush(data);
    }
}
