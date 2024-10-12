package pl.pwr.ite.server.admin.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.pwr.ite.server.admin.web.service.RegistrationEntryFacade;

@RestController
@RequestMapping("/registration-entry")
@RequiredArgsConstructor
public class RegistrationEntryController implements InitializingBean {

    private final RegistrationEntryFacade registrationEntryFacade;

    @Override
    public void afterPropertiesSet() throws Exception {

    }
}
