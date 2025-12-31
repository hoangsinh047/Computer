package org.computer.backend.service.product;

import org.computer.entity.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductService {
    Optional<Product> findById(UUID id);
    List<Product> searchByName(String pattern);

    Page<Product> findAll(Pageable pageable);
    Product create(Product product);
    Optional<Product> update(UUID id, Product product);
    void deleteById(UUID id);
}
