package ru.kata.spring.boot_security.demo.configs.init;

import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.annotation.PostConstruct;
import java.util.Set;

@Component
public class DataInitializer {

    private final UserService userService;
    private final RoleRepository roleRepository;

    public DataInitializer(UserService userService, RoleRepository roleRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    public void init() {
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseGet(() -> roleRepository.save(new Role("ROLE_USER")));

        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                .orElseGet(() -> roleRepository.save(new Role("ROLE_ADMIN")));

        addUser("Иван", "Иванов", "ivan@mail.com", "111111", Set.of(userRole, adminRole));
        addUser("Сергей", "Сергеевич", "sergey@mail.com", "222222", Set.of(userRole));
        addUser("Артём", "Артёмович", "artem@mail.com", "333333", Set.of(userRole));
        addUser("Вадим", "Вадимович", "vadim@mail.com", "444444", Set.of(userRole));
        addUser("Артур", "Артурович", "artyr@mail.com", "555555", Set.of(userRole));
    }

    private void addUser(String name, String lastName, String email, String rawPassword, Set<Role> roles) {
        if (!userService.existsByEmail(email)) {
            User user = new User();
            user.setName(name);
            user.setLastName(lastName);
            user.setEmail(email);
            user.setPassword(rawPassword);
            user.setRoles(roles);
            userService.saveUser(user);
        }
    }
}
