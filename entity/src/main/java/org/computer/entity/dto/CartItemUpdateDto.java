package org.computer.entity.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class CartItemUpdateDto {
    @NotNull
    @Min(0)
    private Integer quantity;

    public CartItemUpdateDto() {
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}

