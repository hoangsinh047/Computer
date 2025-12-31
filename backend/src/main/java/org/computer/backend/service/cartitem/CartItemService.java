package org.computer.backend.service.cartitem;

import org.computer.entity.entity.CartItem;
import org.computer.entity.entity.CartItemId;

import java.util.List;
import java.util.UUID;

public interface CartItemService {
    List<CartItem> findByCartId(UUID cartId);
    CartItem save(CartItem item);
    void deleteById(CartItemId id);
}

