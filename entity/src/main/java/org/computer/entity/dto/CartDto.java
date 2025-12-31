package org.computer.entity.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.computer.entity.dto.CartItemDto;

/**
 * DTO for Cart
 */
public class CartDto extends BaseDto {
    private UUID userId;
    private List<CartItemDto> items = new ArrayList<>();

    public CartDto() {
    }

    public CartDto(UUID id, java.time.Instant createdAt, java.time.Instant updatedAt, UUID userId) {
        super(id, createdAt, updatedAt);
        this.userId = userId;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public List<CartItemDto> getItems() {
        return items;
    }

    public void setItems(List<CartItemDto> items) {
        this.items = items;
    }

    @Override
    public String toString() {
        return "CartDto{" +
                "id=" + getId() +
                ", userId=" + userId +
                ", itemsCount=" + (items == null ? 0 : items.size()) +
                '}';
    }
}
