package org.computer.backend.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.computer.backend.api.mapper.UserMapper;
import org.computer.backend.repository.user.UserRepository;
import org.computer.backend.service.auth.AuthService;
import org.computer.backend.service.auth.PasswordResetTokenService;
import org.computer.entity.dto.UserDto;
import org.computer.entity.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenService passwordResetTokenService;

    public AuthController(
            AuthService authService,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            PasswordResetTokenService passwordResetTokenService
    ) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.passwordResetTokenService = passwordResetTokenService;
    }

    public static class LoginRequest {
        // Keep `username` to remain backward-compatible with existing clients.
        private String username;
        // Also accept `identifier` (username OR email) — useful for newer clients.
        private String identifier;

        @NotBlank(message = "password must not be blank")
        private String password;

        // no-arg constructor (implicit) is fine; explicit constructor optional
        public LoginRequest() {}

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getIdentifier() {
            return identifier;
        }

        public void setIdentifier(String identifier) {
            this.identifier = identifier;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        try {
            // Determine identifier: prefer `username` (backwards compat), then `identifier`.
            String id = (req.getUsername() != null && !req.getUsername().isBlank()) ? req.getUsername() : req.getIdentifier();
            if (id == null || id.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("code", "IDENTIFIER_REQUIRED", "message", "Vui lòng nhập username hoặc email"));
            }

            var result = authService.login(id, req.getPassword());
            return ResponseEntity.ok(Map.of(
                    "accessToken", result.accessToken(),
                    "tokenType", "Bearer",
                    "expiresIn", result.expiresIn(),
                    "user", UserMapper.toDto(result.user())
            ));
        } catch (IllegalArgumentException e) {
            if ("INVALID_CREDENTIALS".equals(e.getMessage())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("code", "INVALID_CREDENTIALS", "message", "Sai tài khoản hoặc mật khẩu"));
            }
            throw e;
        }
    }

    public record RegisterRequest(
            @NotBlank String username,
            @NotBlank @Email String email,
            @NotBlank String password,
            @NotBlank String confirmPassword
    ) {}

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        if (!req.password().equals(req.confirmPassword())) {
            return ResponseEntity.badRequest().body(Map.of("code", "PASSWORD_MISMATCH", "message", "Mật khẩu nhập lại không khớp"));
        }
        try {
            User u = authService.register(req.username(), req.email(), req.password());
            UserDto dto = UserMapper.toDto(u);
            return ResponseEntity.status(HttpStatus.CREATED).body(dto);
        } catch (IllegalArgumentException e) {
            return switch (e.getMessage()) {
                case "USERNAME_TAKEN" -> ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("code", "USERNAME_TAKEN", "message", "Username đã tồn tại"));
                case "EMAIL_TAKEN" -> ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("code", "EMAIL_TAKEN", "message", "Email đã tồn tại"));
                default -> throw e;
            };
        }
    }

    public record ForgotPasswordRequest(@NotBlank @Email String email) {}

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest req) {
        userRepository.findByEmail(req.email()).ifPresent(user -> {
            var gen = passwordResetTokenService.create(user);
            // Dev-mode: log token to console. In production, send email.
            System.out.println("[DEV] Password reset token for " + req.email() + ": " + gen.rawToken());
        });
        return ResponseEntity.ok(Map.of("message", "Nếu email tồn tại, hệ thống đã gửi hướng dẫn đặt lại mật khẩu"));
    }

    public record ResetPasswordRequest(@NotBlank String token, @NotBlank String newPassword, @NotBlank String confirmPassword) {}

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest req) {
        if (!req.newPassword().equals(req.confirmPassword())) {
            return ResponseEntity.badRequest().body(Map.of("code", "PASSWORD_MISMATCH", "message", "Mật khẩu nhập lại không khớp"));
        }

        var tokenOpt = passwordResetTokenService.findValidByRawToken(req.token());
        if (tokenOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("code", "TOKEN_INVALID", "message", "Token không hợp lệ hoặc đã hết hạn"));
        }

        var t = tokenOpt.get();
        var user = t.getUser();
        user.setPassword(passwordEncoder.encode(req.newPassword()));
        userRepository.save(user);
        passwordResetTokenService.markUsed(t);

        return ResponseEntity.ok(Map.of("message", "Đặt lại mật khẩu thành công"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UUID userId = UUID.fromString(authentication.getPrincipal().toString());
        return userRepository.findById(userId)
                .map(UserMapper::toDto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
}
