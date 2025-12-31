package org.computer.backend.repository.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.computer.entity.entity.Order;

import java.util.List;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findByUserId(UUID userId);
}

