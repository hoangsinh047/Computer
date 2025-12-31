package org.computer.backend.service.user;

import org.computer.entity.entity.User;

import java.util.Optional;
import java.util.UUID;

public interface UserService {
    Optional<User> findById(UUID id);
    Optional<User> findByEmail(String email);
}

