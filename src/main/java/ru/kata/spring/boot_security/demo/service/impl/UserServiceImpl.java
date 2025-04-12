package ru.kata.spring.boot_security.demo.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;
import java.util.NoSuchElementException;

@Transactional
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(final UserRepository userRepository) {
        this.userRepository = userRepository;
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
        userRepository.save(user);
    }

    @Override
    public void updateUser(User user) {
        if (!userRepository.existsById(user.getId())) {
            throw new NoSuchElementException("Пользователь для обновления не найден");
        }
        userRepository.save(user);
    }

    @Override
    public void updateUserRoles(Long userId, List<Role> roles) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("Пользователь для обновления не найден"));

        existingUser.setRoles(roles);
        userRepository.save(existingUser);
    }

    @Override
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }
}
