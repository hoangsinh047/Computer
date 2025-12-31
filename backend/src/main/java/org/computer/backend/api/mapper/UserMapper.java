package org.computer.backend.api.mapper;

import org.computer.entity.dto.UserDto;
import org.computer.entity.entity.User;

public class UserMapper {
    public static UserDto toDto(User u) {
        if (u == null) return null;
        UserDto dto = new UserDto(u.getId(), u.getCreatedAt(), u.getUpdatedAt(), u.getUsername(), u.getEmail(), u.getRole());
        // addresses omitted
        return dto;
    }
}

