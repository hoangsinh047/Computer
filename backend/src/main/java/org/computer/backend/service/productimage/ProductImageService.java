package org.computer.backend.service.productimage;

import org.computer.entity.entity.ProductImage;

import java.util.List;
import java.util.UUID;

public interface ProductImageService {
    List<ProductImage> findByProductId(UUID productId);
    ProductImage save(ProductImage image);
}

