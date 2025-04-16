package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;

import java.util.List;
import java.util.Set;

public interface UserService {
    List<User> getAllUsers();

    User getUserById(Long id);

    User getUserByEmail(String email);

    void saveUser(User user);

    void updateUser(User user);

    void updateUserRoles(Long userId, Set<Role> roles);

    void deleteUserById(Long id);

    boolean existsByEmail(String email);
}
