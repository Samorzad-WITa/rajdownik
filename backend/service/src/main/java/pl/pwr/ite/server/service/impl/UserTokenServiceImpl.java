package pl.pwr.ite.server.service.impl;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.NonNull;
import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.QUserToken;
import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.model.entity.UserToken;
import pl.pwr.ite.server.model.filter.UserTokenFilter;
import pl.pwr.ite.server.model.repository.UserTokenRepository;
import pl.pwr.ite.server.service.UserTokenService;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserTokenServiceImpl extends FilterableEntityServiceBase<UserToken, UserTokenFilter> implements UserTokenService {

    @PersistenceContext
    private EntityManager entityManager;

    public UserTokenServiceImpl(UserTokenRepository repository) {
        super(repository);
    }

    @Override
    public String generateToken(@NonNull User user) {
        var idString = UUID.randomUUID().toString();
        return "ut-" + idString;
    }

    @Override
    public UserToken findByToken(String token, LocalDateTime referenceTime) {
        var path = QUserToken.userToken;
        return new JPAQuery<>(entityManager).select(path).from(path)
                .where(Expressions.allOf(
                        path.token.eq(token),
                        path.expiryTime.after(referenceTime)
                )).fetchOne();
    }
}
