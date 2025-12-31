package org.computer.entity.dto;

import java.math.BigDecimal;
import java.util.UUID;

import org.computer.entity.dto.OrderItemIdDto;

/**
 * DTO for OrderItem
 */
public class OrderItemDto {
    private OrderItemIdDto id;
    private UUID productId;
    private int quantity;
    private BigDecimal unitPrice;

    public OrderItemDto() {
    }

    public OrderItemDto(OrderItemIdDto id, UUID productId, int quantity, BigDecimal unitPrice) {
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }

    public OrderItemIdDto getId() {
        return id;
    }

    public void setId(OrderItemIdDto id) {
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

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    @Override
    public String toString() {
        return "OrderItemDto{" +
                "id=" + (id == null ? null : id.toString()) +
                ", productId=" + productId +
                ", quantity=" + quantity +
                ", unitPrice=" + unitPrice +
                '}';
    }
}
