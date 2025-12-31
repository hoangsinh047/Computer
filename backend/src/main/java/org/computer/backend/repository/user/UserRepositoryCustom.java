package org.computer.backend.repository.user;

import org.computer.entity.entity.User;

import java.util.Optional;

public interface UserRepositoryCustom {
    Optional<User> findByEmailCustom(String email);
}

