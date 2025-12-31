package org.computer.backend.api.mapper;

import org.computer.entity.dto.CartDto;
import org.computer.entity.dto.CartItemDto;
import org.computer.entity.entity.Cart;

import java.util.stream.Collectors;

public class CartMapper {

    public static CartDto toDto(Cart cart) {
        if (cart == null) return null;
        CartDto dto = new CartDto(cart.getId(), cart.getCreatedAt(), cart.getUpdatedAt(), cart.getUser() != null ? cart.getUser().getId() : null);
        dto.setItems(cart.getItems().stream().map(CartItemMapper::toDto).collect(Collectors.toList()));
        return dto;
    }
}

