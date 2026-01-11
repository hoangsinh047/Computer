package org.computer.backend.service.auth;

import org.computer.backend.repository.PasswordResetTokenRepository;
import org.computer.entity.entity.PasswordResetToken;
import org.computer.entity.entity.User;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HexFormat;
import java.util.Optional;

@Service
public class PasswordResetTokenService {

    private final PasswordResetTokenRepository repo;
    private final SecureRandom random = new SecureRandom();

    public PasswordResetTokenService(PasswordResetTokenRepository repo) {
        this.repo = repo;
    }

    public record GeneratedToken(String rawToken, PasswordResetToken entity) {}

    public GeneratedToken create(User user) {
        String raw = generateRawToken();
        String hash = sha256Hex(raw);

        PasswordResetToken t = new PasswordResetToken();
        t.setUser(user);
        t.setTokenHash(hash);
        t.setExpiresAt(Instant.now().plus(30, ChronoUnit.MINUTES));

        return new GeneratedToken(raw, repo.save(t));
    }

    public Optional<PasswordResetToken> findValidByRawToken(String rawToken) {
        String hash = sha256Hex(rawToken);
        return repo.findByTokenHash(hash)
                .filter(t -> t.getUsedAt() == null)
                .filter(t -> t.getExpiresAt() != null && t.getExpiresAt().isAfter(Instant.now()));
    }

    public void markUsed(PasswordResetToken token) {
        token.setUsedAt(Instant.now());
        repo.save(token);
    }

    private String generateRawToken() {
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        return HexFormat.of().formatHex(bytes);
    }

    private String sha256Hex(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] h = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(h);
        } catch (Exception e) {
            throw new IllegalStateException("Cannot hash token", e);
        }
    }
}

