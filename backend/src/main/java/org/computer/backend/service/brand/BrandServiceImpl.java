package org.computer.backend.service.brand;

import org.computer.backend.repository.brand.BrandRepository;
import org.computer.backend.repository.brand.BrandRepositoryCustom;
import org.computer.entity.entity.Brand;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;
    private final BrandRepositoryCustom brandRepositoryCustom;

    public BrandServiceImpl(BrandRepository brandRepository, BrandRepositoryCustom brandRepositoryCustom) {
        this.brandRepository = brandRepository;
        this.brandRepositoryCustom = brandRepositoryCustom;
    }

    @Override
    public Optional<Brand> findById(UUID id) {
        return brandRepository.findById(id);
    }

    @Override
    public Optional<Brand> findByName(String name) {
        return brandRepository.findByName(name);
    }

    @Override
    public List<Brand> findBrandsWithProducts() {
        return brandRepositoryCustom.findBrandsWithProducts();
    }

    @Override
    @Transactional
    public Brand save(Brand brand) {
        return brandRepository.save(brand);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        brandRepository.deleteById(id);
    }
}

