package ru.kata.spring.boot_security.demo.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.mapper.UserMapper;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@Controller
public class AdminPageController {

    private final UserService userService;

    public AdminPageController(final UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public String showAdminPage(Model model, Principal principal) {
        User user = userService.getUserByEmail(principal.getName());

        model.addAttribute("users",
                UserMapper.toDto(userService.getAllUsers()));
        model.addAttribute("user",
                UserMapper.toDto(user));
        model.addAttribute("currentUser",
                UserMapper.toDto(user));

        return "users-table";
    }
}
