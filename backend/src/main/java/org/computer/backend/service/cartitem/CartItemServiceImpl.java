package org.computer.backend.service.cartitem;

import org.computer.backend.repository.cartitem.CartItemRepository;
import org.computer.entity.entity.CartItem;
import org.computer.entity.entity.CartItemId;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class CartItemServiceImpl implements CartItemService {

    private final CartItemRepository cartItemRepository;

    public CartItemServiceImpl(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    @Override
    public List<CartItem> findByCartId(UUID cartId) {
        return cartItemRepository.findByIdCartId(cartId);
    }

    @Override
    @Transactional
    public CartItem save(CartItem item) {
        return cartItemRepository.save(item);
    }

    @Override
    @Transactional
    public void deleteById(CartItemId id) {
        cartItemRepository.deleteById(id);
    }
}

