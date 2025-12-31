package org.computer.backend.service.cart;

import org.computer.backend.repository.cart.CartRepository;
import org.computer.entity.entity.Cart;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    public CartServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public Optional<Cart> findById(UUID id) {
        return cartRepository.findById(id);
    }

    @Override
    public Optional<Cart> findByUserId(UUID userId) {
        return cartRepository.findByUserId(userId);
    }

    @Override
    @Transactional
    public Cart save(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        cartRepository.deleteById(id);
    }
}

