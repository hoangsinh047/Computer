package org.computer.backend.api.mapper;

import org.computer.entity.dto.OrderDto;
import org.computer.entity.dto.OrderItemDto;
import org.computer.entity.entity.Order;
import org.computer.entity.entity.OrderItem;

import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderDto toDto(Order order) {
        if (order == null) return null;
        OrderDto dto = new OrderDto(order.getId(), order.getCreatedAt(), order.getUpdatedAt(), order.getUser() != null ? order.getUser().getId() : null, order.getStatus());
        dto.setItems(order.getItems().stream().map(OrderMapper::toItemDto).collect(Collectors.toList()));
        return dto;
    }

    public static OrderItemDto toItemDto(OrderItem item) {
        if (item == null) return null;
        return new OrderItemDto(item.getId() == null ? null : new org.computer.entity.dto.OrderItemIdDto(item.getId().getOrderId(), item.getId().getProductId()),
                item.getProduct() != null ? item.getProduct().getId() : null,
                item.getQuantity(), item.getUnitPrice());
    }
}

