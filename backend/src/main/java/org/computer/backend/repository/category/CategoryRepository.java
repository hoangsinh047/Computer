package org.computer.backend.repository.category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.computer.entity.entity.Category;

import java.util.Optional;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    Optional<Category> findByName(String name);
}

