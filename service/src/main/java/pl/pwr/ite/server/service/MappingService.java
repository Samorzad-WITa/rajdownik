package pl.pwr.ite.server.service;

import pl.pwr.ite.server.mapping.MappingProperties;

public interface MappingService {

    <T extends MappingProperties> T createProperties(Class<T> propertiesType);
}
