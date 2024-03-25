package pl.pwr.ite.server.client.web.mapper;

import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.DataDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.Data;

@Component
public class DataMapper extends MapperBase<Data, DataDto, DataDto.Properties> {

    @Override
    public void transform(Data source, DataDto destination, DataDto.Properties properties) {
        destination.setLabel(source.getLabel());
    }
}
