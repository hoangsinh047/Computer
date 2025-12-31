package org.computer.backend.repository.productspec;

import org.springframework.data.jpa.repository.JpaRepository;
import org.computer.entity.entity.ProductSpec;

import java.util.List;
import java.util.UUID;

public interface ProductSpecRepository extends JpaRepository<ProductSpec, UUID> {
    List<ProductSpec> findByProductId(UUID productId);
}

