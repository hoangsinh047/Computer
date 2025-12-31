package org.computer.backend.repository.review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.computer.entity.entity.Review;

import java.util.List;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {
    List<Review> findByProductId(UUID productId);
}

