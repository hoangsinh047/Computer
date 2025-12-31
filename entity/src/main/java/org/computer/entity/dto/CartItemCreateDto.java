package org.computer.entity.dto;

import java.util.UUID;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class CartItemCreateDto {
    @NotNull
    private UUID productId;
    @NotNull
    @Min(1)
    private Integer quantity;

    public CartItemCreateDto() {
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
}

