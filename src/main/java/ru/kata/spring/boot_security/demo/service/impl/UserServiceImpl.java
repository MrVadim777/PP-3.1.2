package ru.kata.spring.boot_security.demo.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@Transactional
@Service
public class UserServiceImpl implements UserService {

    private final RoleService roleService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(final RoleService roleService, final UserRepository userRepository,
                           final PasswordEncoder passwordEncoder) {

        this.roleService = roleService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Пользователь с id " + id + " не найден"));
    }

    @Transactional(readOnly = true)
    @Override
    public User getUserByEmail(String email) {
        return userRepository.findUserWithRolesByEmail(email)
                .orElseThrow(() -> new NoSuchElementException(("Пользователь с email " + email + " не найден")));
    }

    @Override
    public void saveUser(User user) {
        Set<Role> fullRoles = roleService.getRolesByNames(
                user.getRoles().stream()
                        .map(Role::getName)
                        .collect(Collectors.toSet())
        );

        if (fullRoles.isEmpty()) {
            fullRoles.add(roleService.getRoleByName("ROLE_USER"));
        }

        user.setRoles(fullRoles);

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Override
    public void updateUser(User user) {
        if (!userRepository.existsById(user.getId())) {
            throw new NoSuchElementException("Пользователь для обновления не найден");
        }

        if (user.getPassword() != null && !user.getPassword().isBlank()) {
            if (!user.getPassword().startsWith("$2a$")) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
            }
        } else {
            User existingUser = userRepository.findById(user.getId())
                    .orElseThrow(() -> new NoSuchElementException("Пользователь для обновления не найден"));
            user.setPassword(existingUser.getPassword());
        }

        Set<Role> fullRoles = roleService.getRolesByNames(
                user.getRoles().stream()
                        .map(Role::getName)
                        .collect(Collectors.toSet())
        );

        user.setRoles(fullRoles);
        userRepository.save(user);
    }

    @Override
    public void updateUserRoles(Long userId, Set<Role> roles) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("Пользователь для обновления не найден"));

        existingUser.setRoles(roles);
        userRepository.save(existingUser);
    }

    @Override
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.findUserWithRolesByEmail(email).isPresent();
    }
}
