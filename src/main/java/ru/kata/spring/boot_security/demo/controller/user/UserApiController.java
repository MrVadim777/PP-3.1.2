package ru.kata.spring.boot_security.demo.controller.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.dto.UserDto;
import ru.kata.spring.boot_security.demo.dto.UserUpdateDto;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.mapper.UserMapper;
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
    public ResponseEntity<UserDto> getCurrentUser(Principal principal) {
        return ResponseEntity.ok(
                UserMapper.toDto(userService.getUserByEmail(principal.getName())));
    }

    @PutMapping("/updateMyProfile")
    public ResponseEntity<User> updateCurrentUser(@RequestBody UserUpdateDto updatedUser, Principal principal) {
        User currentUser = userService.getUserByEmail(principal.getName());

        currentUser.setName(updatedUser.getName());
        currentUser.setLastName(updatedUser.getLastName());
        currentUser.setEmail(updatedUser.getEmail());

        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
            currentUser.setPassword(updatedUser.getPassword());
        }

        userService.updateUser(currentUser);
        return ResponseEntity.ok(currentUser);
    }
}
