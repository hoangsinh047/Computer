package org.computer.backend.service.auth;

import org.computer.backend.repository.user.UserRepository;
import org.computer.backend.security.JwtService;
import org.computer.entity.entity.Role;
import org.computer.entity.entity.User;
import org.springframework.dao.DataIntegrityViolationException;
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

    public User register(String username, String email, String password, String phone, Role role) {
        // Normalize inputs to avoid uniqueness surprises (trim, lower-case email)
        username = username == null ? null : username.trim();
        email = email == null ? null : email.trim().toLowerCase();

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
        u.setPhone(phone);
        u.setRole(role);

        try {
            return userRepository.save(u);
        } catch (DataIntegrityViolationException ex) {
            Throwable root = ex.getMostSpecificCause();
            String msg = root != null ? root.getMessage() : ex.getMessage();
            if (msg != null) {
                String low = msg.toLowerCase();
                if (low.contains("email")) {
                    throw new IllegalArgumentException("EMAIL_TAKEN");
                }
                if (low.contains("username")) {
                    throw new IllegalArgumentException("USERNAME_TAKEN");
                }
            }
            throw new IllegalArgumentException("DB_CONSTRAINT");
        }
    }
}
