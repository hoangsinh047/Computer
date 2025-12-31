package org.computer.backend.service.productimage;

import org.computer.backend.repository.productimage.ProductImageRepository;
import org.computer.entity.entity.ProductImage;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class ProductImageServiceImpl implements ProductImageService {

    private final ProductImageRepository productImageRepository;

    public ProductImageServiceImpl(ProductImageRepository productImageRepository) {
        this.productImageRepository = productImageRepository;
    }

    @Override
    public List<ProductImage> findByProductId(UUID productId) {
        return productImageRepository.findByProductId(productId);
    }

    @Override
    @Transactional
    public ProductImage save(ProductImage image) {
        return productImageRepository.save(image);
    }
}

