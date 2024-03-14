package pl.pwr.ite.server.auth.web.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import pl.pwr.ite.server.auth.web.dto.UserDto;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/registration")
    public String showRegistrationForm(WebRequest request, Model model) {
        UserDto dto = new UserDto();
        model.addAttribute("user", dto);
        return "registration";
    }

    @GetMapping("/test")
    public String test() {
        return "teststr";
    }
}
