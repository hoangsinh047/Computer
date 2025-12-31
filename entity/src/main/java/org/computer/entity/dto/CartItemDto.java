package org.computer.entity.dto;

import java.util.UUID;

import org.computer.entity.dto.CartItemIdDto;

/**
 * DTO for CartItem
 */
public class CartItemDto {
    private CartItemIdDto id;
    private UUID productId;
    private int quantity;

    public CartItemDto() {
    }

    public CartItemDto(CartItemIdDto id, UUID productId, int quantity) {
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
    }

    public CartItemIdDto getId() {
        return id;
    }

    public void setId(CartItemIdDto id) {
        this.id = id;
    }

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(UUID productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "CartItemDto{" +
                "id=" + (id == null ? null : id.toString()) +
                ", productId=" + productId +
                ", quantity=" + quantity +
                '}';
    }
}
