package org.computer.backend.service.auth;

import org.computer.backend.repository.user.UserRepository;
import org.computer.backend.security.JwtService;
import org.computer.entity.entity.Role;
import org.computer.entity.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public record LoginResult(String accessToken, long expiresIn, User user) {}

    public LoginResult login(String identifier, String password) {
        Optional<User> userOpt = userRepository.findByUsername(identifier);
        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByEmail(identifier);
        }

        User user = userOpt.orElseThrow(() -> new IllegalArgumentException("INVALID_CREDENTIALS"));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("INVALID_CREDENTIALS");
        }

        String token = jwtService.generateAccessToken(user);
        return new LoginResult(token, jwtService.getAccessTokenTtlSeconds(), user);
    }

    public User register(String username, String email, String password) {
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("USERNAME_TAKEN");
        }
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("EMAIL_TAKEN");
        }

        User u = new User();
        u.setUsername(username);
        u.setEmail(email);
        u.setPassword(passwordEncoder.encode(password));
        u.setRole(Role.USER);

        return userRepository.save(u);
    }
}
