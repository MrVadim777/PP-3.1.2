package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.entity.Role;

import java.util.List;

public interface RoleService {
    List<Role> getAllRoles();

    Role getRoleById(Long id);

    void saveRole(Role role);

    void updateRole(Role role);

    void deleteRoleById(Long id);
}
