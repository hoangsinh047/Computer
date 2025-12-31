package org.computer.backend.service.category;

import org.computer.entity.entity.Category;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CategoryService {
    Optional<Category> findById(UUID id);
    List<Category> findRootCategories();
    Optional<Category> findByName(String name);
    Category save(Category category);
    void deleteById(UUID id);
}

