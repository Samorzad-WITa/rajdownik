package pl.pwr.ite.server.auth.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;

@Controller
@RequiredArgsConstructor
public class LoginController {

    @GetMapping("/login")
    public String oauth2LoginPage(Model model,
                                  HttpServletRequest request,
                                  @CurrentSecurityContext(expression = "authentication")Authentication authentication,
                                  @Value("${spring.security.oauth2.server.login.captcha.enabled:true}") boolean enableCaptchaLogin,
                                  @RequestAttribute(name = "org.springframework.security.web.csrf.CsrfToken", required = false) CsrfToken csrfToken) {

        model.addAttribute("baseUrlWeb", "http://localhost:1144/");
        var isError = request.getParameter("error") != null;
        model.addAttribute("isError", isError);
        if(isError) {
            var session = request.getSession(false);
            if(session != null) {
                var ex = (AuthenticationException) session.getAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
                model.addAttribute("errorCode", "invalid-credentials");
            }
        }
        if (csrfToken != null) {
            model.addAttribute("csrfTokenValue", csrfToken.getToken());
            model.addAttribute("csrfTokenParameterName", csrfToken.getParameterName());
        }

        return "login";
    }
}
