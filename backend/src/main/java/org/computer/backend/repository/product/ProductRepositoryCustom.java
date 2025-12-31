package org.computer.backend.repository.product;

import org.computer.entity.entity.Product;

import java.util.List;

public interface ProductRepositoryCustom {
    List<Product> findByNameLike(String namePattern);
}

