package org.computer.entity.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import jakarta.validation.constraints.NotNull;

public class OrderCreateDto {
    @NotNull
    private UUID userId;
    private List<OrderItemCreateDto> items = new ArrayList<>();

    public OrderCreateDto() {
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public List<OrderItemCreateDto> getItems() {
        return items;
    }

    public void setItems(List<OrderItemCreateDto> items) {
        this.items = items;
    }
}

