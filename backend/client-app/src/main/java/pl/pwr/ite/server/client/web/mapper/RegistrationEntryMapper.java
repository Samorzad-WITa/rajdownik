package pl.pwr.ite.server.client.web.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.client.web.dto.RegistrationEntryDto;
import pl.pwr.ite.server.mapping.MapperBase;
import pl.pwr.ite.server.model.entity.registration.RegistrationEntry;
import pl.pwr.ite.server.service.UserService;
import pl.pwr.ite.server.web.SecurityFacade;

@Component
@RequiredArgsConstructor
public class RegistrationEntryMapper extends MapperBase<RegistrationEntry, RegistrationEntryDto, RegistrationEntryDto.Properties> {

    @Lazy
    private final RegistrationPartMapper registrationPartMapper;
    private final UserMapper userMapper;
    private final SecurityFacade securityFacade;
    private final UserService userService;

    @Override
    public void transform(RegistrationEntry source, RegistrationEntryDto destination, RegistrationEntryDto.Properties properties) {
        var authenticatedUserId = securityFacade.getAuthenticatedUserReference().getId();
        boolean isAdmin = userService.hasRoleByCodes(authenticatedUserId, "coo");

        destination.setId(source.getId());
        destination.setFirstName(source.getUser().getFirstName());
        destination.setLastName(source.getUser().getLastName());
        destination.setUserCode(source.getUser().getCode());


        boolean canDelete = source.getUserId().equals(authenticatedUserId) || source.getRegisteredById().equals(authenticatedUserId) || isAdmin;
        destination.setCanDelete(canDelete);

        if(properties.isIncludePart()) {
            map(destination::setPart, source.getPart(), registrationPartMapper, properties);
        }
        if(properties.isIncludeUser()) {
            map(destination::setUser, source.getUser(), userMapper, properties);
        }
    }
}
