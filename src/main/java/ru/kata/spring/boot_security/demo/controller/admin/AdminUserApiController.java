package ru.kata.spring.boot_security.demo.controller.admin;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserApiController {

    private final UserService userService;
    private final RoleService roleService;


    public AdminUserApiController(final UserService userService,
                                  final RoleService roleService) {

        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PutMapping("/{id}/roles")
    public ResponseEntity<Void> updateUserRoles(@PathVariable Long id, @RequestBody Set<Role> roles) {
        Set<String> roleNames = roles.stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

        Set<Role> fullRoles = roleService.getRolesByNames(roleNames);

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
