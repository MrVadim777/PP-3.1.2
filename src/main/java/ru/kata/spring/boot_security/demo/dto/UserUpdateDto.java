package ru.kata.spring.boot_security.demo.dto;

import ru.kata.spring.boot_security.demo.entity.Role;

import java.util.Set;

public class UserUpdateDto extends UserDto{
    private String password;

    public UserUpdateDto() {
    }

    public UserUpdateDto(Long id, String email, String name, String lastName,
                         Set<Role> roles, String password) {

        super(id, email, name, lastName, roles);
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
