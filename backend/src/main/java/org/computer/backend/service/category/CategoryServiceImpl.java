package org.computer.backend.service.category;

import org.computer.backend.repository.category.CategoryRepository;
import org.computer.entity.entity.Category;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Optional<Category> findById(UUID id) {
        return categoryRepository.findById(id);
    }

    @Override
    public List<Category> findRootCategories() {
        return categoryRepository.findAll().stream().filter(c -> c.getParent() == null).toList();
    }

    @Override
    public Optional<Category> findByName(String name) {
        return categoryRepository.findByName(name);
    }

    @Override
    @Transactional
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        categoryRepository.deleteById(id);
    }
}

