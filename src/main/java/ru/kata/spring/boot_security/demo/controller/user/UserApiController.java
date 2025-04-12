package ru.kata.spring.boot_security.demo.controller.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserApiController {

    private final UserService userService;
    private final RoleService roleService;
    private final AuthenticationManager authenticationManager;

    public UserApiController(final UserService userService, final RoleService roleService, final AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.roleService = roleService;
        this.authenticationManager = authenticationManager;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }
    @GetMapping("/get")
    public ResponseEntity<User> getUserById(@RequestParam Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        user.setRoles(List.of(roleService.getRoleByName("ROLE_USER")));
        userService.saveUser(user);

        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        Authentication authentication = authenticationManager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        userService.updateUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/{id}/roles")
    public ResponseEntity<Void> updateUserRoles(@PathVariable Long id, @RequestBody List<Role> roles) {
        List<String> roleNames = roles.stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        List<Role> fullRoles = roleService.getRolesByNames(roleNames);

        if (fullRoles.isEmpty()) {
            throw new RuntimeException("Роли не найдены: " + roleNames);
        }

        userService.updateUserRoles(id, fullRoles);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
