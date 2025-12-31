package org.computer.backend.service.productspec;

import org.computer.entity.entity.ProductSpec;

import java.util.List;
import java.util.UUID;

public interface ProductSpecService {
    List<ProductSpec> findByProductId(UUID productId);
    ProductSpec save(ProductSpec spec);
}

