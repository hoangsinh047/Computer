package org.computer.backend.service.brand;

import org.computer.entity.entity.Brand;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BrandService {
    Optional<Brand> findById(UUID id);
    Optional<Brand> findByName(String name);
    List<Brand> findBrandsWithProducts();
    Brand save(Brand brand);
    void deleteById(UUID id);
}

