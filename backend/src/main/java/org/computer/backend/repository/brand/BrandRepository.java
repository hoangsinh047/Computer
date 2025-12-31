package org.computer.backend.repository.brand;

import org.springframework.data.jpa.repository.JpaRepository;
import org.computer.entity.entity.Brand;

import java.util.Optional;
import java.util.UUID;

public interface BrandRepository extends JpaRepository<Brand, UUID> {
    Optional<Brand> findByName(String name);
}

