package org.computer.entity.dto;

import java.math.BigDecimal;
import java.util.UUID;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class OrderItemCreateDto {
    @NotNull
    private UUID productId;
    @NotNull
    @Min(1)
    private Integer quantity;
    private BigDecimal unitPrice; // optional override or null to use current price

    public OrderItemCreateDto() {
    }

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(UUID productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }
}

