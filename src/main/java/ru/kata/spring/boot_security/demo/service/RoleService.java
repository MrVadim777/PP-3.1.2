package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.entity.Role;

import java.util.Set;

public interface RoleService {
    Set<Role> getAllRoles();

    Set<Role> getRolesByNames(Set<String> names);

    Role getRoleById(Long id);

    Role getRoleByName(String name);

    void saveRole(Role role);

    void updateRole(Role role);

    void deleteRoleById(Long id);
}
