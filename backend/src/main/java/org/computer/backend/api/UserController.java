package org.computer.backend.api;

import org.computer.backend.service.user.UserService;
import org.computer.entity.dto.UserDto;
import org.computer.entity.entity.User;
import org.computer.backend.api.mapper.UserMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getById(@PathVariable UUID id) {
        Optional<User> u = userService.findById(id);
        return u.map(UserMapper::toDto).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/by-email")
    public ResponseEntity<UserDto> getByEmail(@RequestParam String email) {
        Optional<User> u = userService.findByEmail(email);
        return u.map(UserMapper::toDto).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}

