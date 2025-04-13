package ru.kata.spring.boot_security.demo.controller.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
public class UserApiController {

    private final UserService userService;

    public UserApiController(final UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getMyProfile")
    public ResponseEntity<User> getCurrentUser(Principal principal) {
        User user = userService.getUserByEmail(principal.getName());
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/updateMyProfile")
    public ResponseEntity<User> updateCurrentUser(@RequestBody User updatedUser, Principal principal) {
        User currentUser = userService.getUserByEmail(principal.getName());

        currentUser.setName(updatedUser.getName());
        currentUser.setLastName(updatedUser.getLastName());
        currentUser.setEmail(updatedUser.getEmail());
        currentUser.setPassword(updatedUser.getPassword());

        userService.updateUser(currentUser);
        return ResponseEntity.ok(currentUser);
    }
}
