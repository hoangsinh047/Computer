package org.computer.backend.repository.product;

import org.computer.entity.entity.Product;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductRepositoryImpl implements ProductRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Product> findByNameLike(String namePattern) {
        TypedQuery<Product> q = em.createQuery("SELECT p FROM Product p WHERE p.name LIKE :p", Product.class);
        q.setParameter("p", namePattern);
        return q.getResultList();
    }
}
