package org.computer.backend.repository.category;

import org.computer.entity.entity.Category;

import java.util.List;

public interface CategoryRepositoryCustom {
    List<Category> findRootCategories();
}

