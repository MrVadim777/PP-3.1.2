package ru.kata.spring.boot_security.demo.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.UserService;

@Service
public class SecurityUserDetailService implements UserDetailsService {

    private final UserService userService;

    public SecurityUserDetailService(final UserService userService) {
        this.userService = userService;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        final User user = userService.getUserByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException(
                    "Пользователь с email " + email + " не найден");
        }

        return new SecurityUser(user);
    }
}
