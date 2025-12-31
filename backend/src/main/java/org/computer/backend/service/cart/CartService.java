package org.computer.backend.service.cart;

import org.computer.entity.entity.Cart;

import java.util.Optional;
import java.util.UUID;

public interface CartService {
    Optional<Cart> findById(UUID id);
    Optional<Cart> findByUserId(UUID userId);
    Cart save(Cart cart);
    void deleteById(UUID id);
}

