package org.computer.entity.dto;

import java.util.Objects;
import java.util.UUID;

/**
 * DTO for OrderItemId (composite key)
 */
public class OrderItemIdDto {
    private UUID orderId;
    private UUID productId;

    public OrderItemIdDto() {
    }

    public OrderItemIdDto(UUID orderId, UUID productId) {
        this.orderId = orderId;
        this.productId = productId;
    }

    public UUID getOrderId() {
        return orderId;
    }

    public void setOrderId(UUID orderId) {
        this.orderId = orderId;
    }

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(UUID productId) {
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItemIdDto that = (OrderItemIdDto) o;
        return Objects.equals(orderId, that.orderId) && Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, productId);
    }

    @Override
    public String toString() {
        return "OrderItemIdDto{" +
                "orderId=" + orderId +
                ", productId=" + productId +
                '}';
    }
}

