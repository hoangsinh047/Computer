package org.computer.backend.repository.cartitem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.computer.entity.entity.CartItem;
import org.computer.entity.entity.CartItemId;

import java.util.List;
import java.util.UUID;

public interface CartItemRepository extends JpaRepository<CartItem, CartItemId> {
    List<CartItem> findByIdCartId(UUID cartId);
}

