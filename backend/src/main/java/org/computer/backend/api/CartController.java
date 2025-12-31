package org.computer.backend.api;

import org.computer.backend.api.mapper.CartItemMapper;
import org.computer.backend.api.mapper.CartMapper;
import org.computer.backend.service.cart.CartService;
import org.computer.backend.service.cartitem.CartItemService;
import org.computer.entity.dto.CartDto;
import org.computer.entity.dto.CartItemCreateDto;
import org.computer.entity.dto.CartItemDto;
import org.computer.entity.dto.CartItemUpdateDto;
import org.computer.entity.entity.Cart;
import org.computer.entity.entity.CartItem;
import org.computer.entity.entity.CartItemId;
import org.computer.entity.entity.Product;
import org.computer.entity.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/carts")
@Validated
public class CartController {

    private final CartService cartService;
    private final CartItemService cartItemService;

    public CartController(CartService cartService, CartItemService cartItemService) {
        this.cartService = cartService;
        this.cartItemService = cartItemService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<CartDto> getById(@PathVariable UUID id) {
        Optional<Cart> c = cartService.findById(id);
        return c.map(CartMapper::toDto).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<CartDto> getByUserId(@PathVariable UUID userId) {
        Optional<Cart> c = cartService.findByUserId(userId);
        return c.map(CartMapper::toDto).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CartDto> create(@Valid @RequestBody CartDto dto) {
        Cart cart = new Cart();
        if (dto.getUserId() != null) {
            User u = new User();
            u.setId(dto.getUserId());
            cart.setUser(u);
        }
        Cart saved = cartService.save(cart);
        return ResponseEntity.status(201).body(CartMapper.toDto(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        cartService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{cartId}/items")
    public ResponseEntity<List<CartItemDto>> listItems(@PathVariable UUID cartId) {
        List<CartItem> items = cartItemService.findByCartId(cartId);
        List<CartItemDto> dtos = items.stream().map(CartItemMapper::toDto).toList();
        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/{cartId}/items")
    @Transactional
    public ResponseEntity<CartItemDto> addItem(@PathVariable UUID cartId, @Valid @RequestBody CartItemCreateDto dto) {
        // Create CartItem with composite id
        CartItem item = CartItemMapper.toEntity(cartId, dto.getProductId(), dto.getQuantity());
        // set product and cart references (avoid loading full entities if unnecessary)
        Product p = new Product();
        p.setId(dto.getProductId());
        item.setProduct(p);
        Cart cart = new Cart();
        cart.setId(cartId);
        item.setCart(cart);
        CartItem saved = cartItemService.save(item);
        return ResponseEntity.status(201).body(CartItemMapper.toDto(saved));
    }

    @PutMapping("/{cartId}/items/{productId}")
    @Transactional
    public ResponseEntity<CartItemDto> updateItem(@PathVariable UUID cartId, @PathVariable UUID productId, @Valid @RequestBody CartItemUpdateDto dto) {
        CartItemId id = new CartItemId(cartId, productId);
        // find by id via repository through service? Using repository directly is not available here; we'll attempt save with provided id
        CartItem item = new CartItem();
        item.setId(id);
        item.setQuantity(dto.getQuantity());
        Product p = new Product(); p.setId(productId);
        item.setProduct(p);
        Cart c = new Cart(); c.setId(cartId);
        item.setCart(c);
        CartItem saved = cartItemService.save(item);
        return ResponseEntity.ok(CartItemMapper.toDto(saved));
    }

    @DeleteMapping("/{cartId}/items/{productId}")
    @Transactional
    public ResponseEntity<Void> deleteItem(@PathVariable UUID cartId, @PathVariable UUID productId) {
        CartItemId id = new CartItemId(cartId, productId);
        cartItemService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

