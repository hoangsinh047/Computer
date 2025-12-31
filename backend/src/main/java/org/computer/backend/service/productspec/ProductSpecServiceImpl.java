package org.computer.backend.service.productspec;

import org.computer.backend.repository.productspec.ProductSpecRepository;
import org.computer.entity.entity.ProductSpec;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class ProductSpecServiceImpl implements ProductSpecService {

    private final ProductSpecRepository productSpecRepository;

    public ProductSpecServiceImpl(ProductSpecRepository productSpecRepository) {
        this.productSpecRepository = productSpecRepository;
    }

    @Override
    public List<ProductSpec> findByProductId(UUID productId) {
        return productSpecRepository.findByProductId(productId);
    }

    @Override
    @Transactional
    public ProductSpec save(ProductSpec spec) {
        return productSpecRepository.save(spec);
    }
}

