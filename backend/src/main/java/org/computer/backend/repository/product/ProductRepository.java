package org.computer.backend.repository.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.computer.entity.entity.Product;

import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
}

