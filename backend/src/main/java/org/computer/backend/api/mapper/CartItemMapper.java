package org.computer.backend.api.mapper;

import org.computer.entity.dto.CartItemDto;
import org.computer.entity.dto.CartItemIdDto;
import org.computer.entity.entity.CartItem;
import org.computer.entity.entity.CartItemId;

import java.util.UUID;

public class CartItemMapper {

    public static CartItemDto toDto(CartItem item) {
        if (item == null) return null;
        CartItemId id = item.getId();
        CartItemIdDto idDto = id == null ? null : new CartItemIdDto(id.getCartId(), id.getProductId());
        return new CartItemDto(idDto, item.getProduct() != null ? item.getProduct().getId() : null, item.getQuantity());
    }

    public static CartItem toEntity(UUID cartId, UUID productId, int qty) {
        CartItem item = new CartItem();
        CartItemId id = new CartItemId(cartId, productId);
        item.setId(id);
        item.setQuantity(qty);
        // product and cart references will be set in service layer to avoid loading extra entities here
        return item;
    }
}

