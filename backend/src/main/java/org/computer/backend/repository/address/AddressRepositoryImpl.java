package org.computer.backend.repository.address;

import org.computer.entity.entity.Address;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

import java.util.List;
import java.util.UUID;

public class AddressRepositoryImpl implements AddressRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Address> findByUserIdCustom(UUID userId) {
        TypedQuery<Address> q = em.createQuery("SELECT a FROM Address a WHERE a.user.id = :uid", Address.class);
        q.setParameter("uid", userId);
        return q.getResultList();
    }
}

