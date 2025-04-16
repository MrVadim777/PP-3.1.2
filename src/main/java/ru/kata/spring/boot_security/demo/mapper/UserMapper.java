package ru.kata.spring.boot_security.demo.mapper;

import ru.kata.spring.boot_security.demo.dto.UserDto;
import ru.kata.spring.boot_security.demo.entity.User;

import java.util.ArrayList;
import java.util.List;

public class UserMapper {

    public static UserDto toDto(User user) {
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getLastName(),
                user.getRoles()
        );
    }

    public static List<UserDto> toDto(List<User> users) {
        List<UserDto> usersDto = new ArrayList<>();

        for (User user : users) {
            usersDto.add(toDto(user));
        }

        return usersDto;
    }
}
