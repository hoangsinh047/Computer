package org.computer.backend.repository.user;

import org.computer.entity.entity.User;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

import java.util.Optional;

public class UserRepositoryImpl implements UserRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Optional<User> findByEmailCustom(String email) {
        TypedQuery<User> q = em.createQuery("SELECT u FROM User u WHERE u.email = :email", User.class);
        q.setParameter("email", email);
        return q.getResultStream().findFirst();
    }
}

