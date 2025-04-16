package ru.kata.spring.boot_security.demo.controller.user;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.mapper.UserMapper;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@Controller
public class UserPageController {

    private final UserService userService;

    public UserPageController(final UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public String showUserPage(Model model, Principal principal) {
        model.addAttribute("user",
                UserMapper.toDto(userService.getUserByEmail(principal.getName())));

        return "user";
    }
}
