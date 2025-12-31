package org.computer.backend.repository.brand;

import org.computer.entity.entity.Brand;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

import java.util.List;

public class BrandRepositoryImpl implements BrandRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Brand> findBrandsWithProducts() {
        TypedQuery<Brand> q = em.createQuery("SELECT DISTINCT b FROM Brand b JOIN b.products p", Brand.class);
        return q.getResultList();
    }
}

