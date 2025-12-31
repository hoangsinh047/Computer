package org.computer.backend.service.orderitem;

import org.computer.entity.entity.OrderItem;
import org.computer.entity.entity.OrderItemId;

import java.util.List;

public interface OrderItemService {
    List<OrderItem> findByOrderId(java.util.UUID orderId);
    OrderItem save(OrderItem item);
}

