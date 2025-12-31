package org.computer.backend.service.order;

import org.computer.backend.repository.order.OrderRepository;
import org.computer.entity.entity.Order;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Optional<Order> findById(UUID id) {
        return orderRepository.findById(id);
    }

    @Override
    public List<Order> findByUserId(UUID userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    @Transactional
    public Order save(Order order) {
        return orderRepository.save(order);
    }
}

