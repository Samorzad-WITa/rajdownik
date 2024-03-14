package pl.pwr.ite.server.service.impl;

import org.springframework.stereotype.Service;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.mapping.MappingPropertiesAccessorBuilder;
import pl.pwr.ite.server.mapping.MappingPropertiesImpl;
import pl.pwr.ite.server.service.MappingService;

@Service
public class MappingServiceImpl implements MappingService {

    private final MappingPropertiesAccessorBuilder propertiesAccessorBuilder = new MappingPropertiesAccessorBuilder();

    @Override
    public <T extends MappingProperties> T createProperties(Class<T> propertiesType) {
        try {
            return propertiesAccessorBuilder.buildClass(propertiesType).getConstructor(MappingProperties.class).newInstance(new MappingPropertiesImpl(propertiesAccessorBuilder));
        } catch (Exception ex) {
            throw new IllegalStateException(ex);
        }
    }
}
