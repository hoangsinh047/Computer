package org.computer.entity.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.computer.entity.entity.OrderStatus;
import org.computer.entity.dto.OrderItemDto;

/**
 * DTO for Order
 */
public class OrderDto extends BaseDto {
    private UUID userId;
    private List<OrderItemDto> items = new ArrayList<>();
    private OrderStatus status;

    public OrderDto() {
    }

    public OrderDto(UUID id, java.time.Instant createdAt, java.time.Instant updatedAt, UUID userId, OrderStatus status) {
        super(id, createdAt, updatedAt);
        this.userId = userId;
        this.status = status;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public List<OrderItemDto> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDto> items) {
        this.items = items;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "OrderDto{" +
                "id=" + getId() +
                ", userId=" + userId +
                ", status=" + status +
                '}';
    }
}
