package ru.kata.spring.boot_security.demo.dto;

import ru.kata.spring.boot_security.demo.entity.Role;

import java.util.Objects;
import java.util.Set;

public class UserDto {
    private Long id;
    private String email;
    private String name;
    private String lastName;
    private Set<Role> roles;

    public UserDto() {
    }

    public UserDto(Long id, String email, String name, String lastName, Set<Role> roles) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", lastName='" + lastName + '\'' +
                ", roles=" + roles +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDto userDto = (UserDto) o;
        return Objects.equals(id, userDto.id) && Objects.equals(email, userDto.email) && Objects.equals(name, userDto.name) && Objects.equals(lastName, userDto.lastName) && Objects.equals(roles, userDto.roles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, name, lastName, roles);
    }
}
