package pl.pwr.ite.server.service.impl;

import com.querydsl.jpa.impl.JPAQuery;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.hibernate.mapping.Filterable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.QRole;
import pl.pwr.ite.server.model.entity.Role;
import pl.pwr.ite.server.model.filter.RoleFilter;
import pl.pwr.ite.server.model.repository.RoleRepository;
import pl.pwr.ite.server.service.RoleService;

import java.util.UUID;

@Service
public class RoleServiceImpl extends FilterableEntityServiceBase<Role, RoleFilter> implements RoleService {

    @PersistenceContext
    private EntityManager entityManager;

    public RoleServiceImpl(RoleRepository repository) {
        super(repository);
    }

    @Override
    public Role findByCode(String code) {
        var path = QRole.role;
        return new JPAQuery<>(entityManager).select(path).from(path)
                .where(path.code.eq(code))
                .fetchOne();
    }
}
