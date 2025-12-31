package org.computer.backend.service.order;

import org.computer.entity.entity.Order;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderService {
    Optional<Order> findById(UUID id);
    List<Order> findByUserId(UUID userId);
    Order save(Order order);
}

