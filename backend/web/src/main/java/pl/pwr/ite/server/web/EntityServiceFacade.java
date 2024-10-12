package pl.pwr.ite.server.web;

import org.springframework.beans.factory.annotation.Autowired;
import pl.pwr.ite.server.GenericHelper;
import pl.pwr.ite.server.mapping.Mapper;
import pl.pwr.ite.server.mapping.MappingProperties;
import pl.pwr.ite.server.model.entity.EntityBase;
import pl.pwr.ite.server.model.filter.Filter;
import pl.pwr.ite.server.model.querydsl.TypedPage;
import pl.pwr.ite.server.service.EntityService;
import pl.pwr.ite.server.service.FilterableEntityService;
import pl.pwr.ite.server.service.MappingService;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public abstract class EntityServiceFacade<E extends EntityBase, F extends Filter, S extends FilterableEntityService<E, F>, D, P extends MappingProperties, M extends Mapper<? super E, ? super D, P>> {

    protected final S service;
    protected final M mapper;
    protected final Class<P> mappingPropertiesType;

    @Autowired
    private MappingService mappingService;

    @Autowired
    private TypedPageMapper typedPageMapper;

    protected final SecurityFacade securityFacade;

    public EntityServiceFacade(S service, M mapper, SecurityFacade securityFacade) {
        this.service = service;
        this.mapper = mapper;
        this.securityFacade = securityFacade;
        mappingPropertiesType = GenericHelper.getArgumentType(getClass(), "P");
    }

    public S getService() {
        return service;
    }

    public E getById(UUID id) {
        var entity = service.findById(id);
        return entity;
    }

    public Collection<E> getList(F filter) {
        return service.getList(filter);
    }

    public TypedPage<E> getPage(F filter) {
        return service.getPage(filter);
    }

    public PageDto<D> getPage(F filter, MappingProperties mappingProperties) {
        return typedPageMapper.map(getPage(filter), mappingProperties.wrapAs(PageDto.Properties.class).setContentMapper(mapper));
    }

    public Collection<D> getList(F filter, MappingProperties properties) {
        return (List<D>) mapper.map(getList(filter), properties);
    }

    public D getById(UUID id, MappingProperties properties) {
        return (D) mapper.map(service.findById(id), properties);
    }

    public D map(E entity) {
        return (D) mapper.map(entity, mappingService.createProperties(mappingPropertiesType));
    }

    public D map(E entity, MappingProperties properties) {
        return (D) mapper.map(entity, properties);
    }

    public Collection<D> map(Collection<E> entities, MappingProperties mappingProperties) {
        return (Collection<D>)mapper.map(entities, mappingProperties);
    }

    public E save(E entity) {
        return service.save(entity);
    }

    public E saveAndFlush(E entity) {
        return service.saveAndFlush(entity);
    }
}
