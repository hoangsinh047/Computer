package org.computer.backend.repository.category;

import org.computer.entity.entity.Category;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

import java.util.List;

public class CategoryRepositoryImpl implements CategoryRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Category> findRootCategories() {
        TypedQuery<Category> q = em.createQuery("SELECT c FROM Category c WHERE c.parent IS NULL", Category.class);
        return q.getResultList();
    }
}

