package org.computer.backend.repository.productimage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.computer.entity.entity.ProductImage;

import java.util.List;
import java.util.UUID;

public interface ProductImageRepository extends JpaRepository<ProductImage, UUID> {
    List<ProductImage> findByProductId(UUID productId);
}

