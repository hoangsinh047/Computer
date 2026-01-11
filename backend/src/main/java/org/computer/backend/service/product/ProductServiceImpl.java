package org.computer.backend.service.product;

import org.computer.backend.repository.product.ProductRepository;
import org.computer.entity.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Optional<Product> findById(UUID id) {
        return productRepository.findById(id);
    }

    @Override
    public List<Product> searchByName(String pattern) {
        return productRepository.findByNameLike(pattern);
    }

    @Override
    public Page<Product> findAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    @Transactional
    public Product create(Product product) {
        return productRepository.save(product);
    }

    @Override
    @Transactional
    public Optional<Product> update(UUID id, Product product) {
        return productRepository.findById(id).map(existing -> {
            existing.setName(product.getName());
            existing.setDescription(product.getDescription());
            existing.setPrice(product.getPrice());
            existing.setBrand(product.getBrand());
            existing.setCategory(product.getCategory());
            existing.setSku(product.getSku());
            existing.setStockQuantity(product.getStockQuantity());
            existing.setWarrantyMonths(product.getWarrantyMonths());
            existing.setStatus(product.getStatus());
            existing.setDiscount(product.getDiscount());
            return productRepository.save(existing);
        });
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        productRepository.deleteById(id);
    }
}
