package org.computer.backend.repository.orderitem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.computer.entity.entity.OrderItem;
import org.computer.entity.entity.OrderItemId;

import java.util.List;
import java.util.UUID;

public interface OrderItemRepository extends JpaRepository<OrderItem, OrderItemId> {
    List<OrderItem> findByIdOrderId(UUID orderId);
}

