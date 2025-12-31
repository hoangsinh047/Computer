package org.computer.backend.service.orderitem;

import org.computer.backend.repository.orderitem.OrderItemRepository;
import org.computer.entity.entity.OrderItem;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderItemRepository orderItemRepository;

    public OrderItemServiceImpl(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    public List<OrderItem> findByOrderId(UUID orderId) {
        return orderItemRepository.findByIdOrderId(orderId);
    }

    @Override
    @Transactional
    public OrderItem save(OrderItem item) {
        return orderItemRepository.save(item);
    }
}

