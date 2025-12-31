package org.computer.backend.api;

import org.computer.backend.api.mapper.OrderMapper;
import org.computer.backend.service.order.OrderService;
import org.computer.backend.service.orderitem.OrderItemService;
import org.computer.backend.service.product.ProductService;
import org.computer.backend.service.user.UserService;
import org.computer.entity.dto.OrderCreateDto;
import org.computer.entity.dto.OrderDto;
import org.computer.entity.dto.OrderItemCreateDto;
import org.computer.entity.entity.Order;
import org.computer.entity.entity.OrderItem;
import org.computer.entity.entity.OrderItemId;
import org.computer.entity.entity.Product;
import org.computer.entity.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@Validated
public class OrderController {

    private final OrderService orderService;
    private final OrderItemService orderItemService;
    private final UserService userService;
    private final ProductService productService;

    public OrderController(OrderService orderService, OrderItemService orderItemService, UserService userService, ProductService productService) {
        this.orderService = orderService;
        this.orderItemService = orderItemService;
        this.userService = userService;
        this.productService = productService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getById(@PathVariable UUID id) {
        Optional<Order> o = orderService.findById(id);
        return o.map(OrderMapper::toDto).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDto>> getByUser(@PathVariable UUID userId) {
        List<Order> list = orderService.findByUserId(userId);
        List<OrderDto> dtos = new ArrayList<>();
        for (Order o : list) dtos.add(OrderMapper.toDto(o));
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<OrderDto> create(@Valid @RequestBody OrderCreateDto dto) {
        // build Order entity
        Order order = new Order();
        if (dto.getUserId() != null) {
            User u = new User(); u.setId(dto.getUserId()); order.setUser(u);
        }
        order.setItems(new ArrayList<>());
        // persist order first to obtain order id
        Order savedOrder = orderService.save(order);

        List<OrderItem> savedItems = new ArrayList<>();
        for (OrderItemCreateDto itDto : dto.getItems()) {
            OrderItem item = new OrderItem();
            // product reference
            Product p = new Product(); p.setId(itDto.getProductId());
            item.setProduct(p);
            item.setQuantity(itDto.getQuantity());
            // determine unitPrice: use provided or snapshot current product price
            if (itDto.getUnitPrice() != null) {
                item.setUnitPrice(itDto.getUnitPrice());
            } else {
                productService.findById(itDto.getProductId()).ifPresent(prod -> item.setUnitPrice(prod.getPrice()));
            }
            // set composite id and order ref
            OrderItemId id = new OrderItemId(savedOrder.getId(), itDto.getProductId());
            item.setId(id);
            item.setOrder(savedOrder);
            OrderItem savedItem = orderItemService.save(item);
            savedItems.add(savedItem);
        }

        // attach saved items to order for response
        savedOrder.setItems(savedItems);

        return ResponseEntity.status(201).body(OrderMapper.toDto(savedOrder));
    }
}
