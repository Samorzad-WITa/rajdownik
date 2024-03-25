package pl.pwr.ite.server.auth.web.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class LoginControllerOld {

    @GetMapping("/loginOld")
    public String loginPage(Model model, HttpServletRequest request) {
        return "login";
    }
}
