package org.computer.backend.repository.brand;

import org.computer.entity.entity.Brand;

import java.util.List;

public interface BrandRepositoryCustom {
    List<Brand> findBrandsWithProducts();
}

