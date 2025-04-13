package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.Set;

@RestController
@RequestMapping("/api/register")
public class RegisterApiController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final RoleService roleService;

    public RegisterApiController(final AuthenticationManager authenticationManager,
                                 final UserService userService,
                                 final RoleService roleService) {

        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.roleService = roleService;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        String passwordBuff = user.getPassword();

        user.setRoles(Set.of(roleService.getRoleByName("ROLE_USER")));
        userService.saveUser(user);

        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(user.getEmail(), passwordBuff);
        Authentication authentication = authenticationManager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return ResponseEntity.ok().build();
    }
}
