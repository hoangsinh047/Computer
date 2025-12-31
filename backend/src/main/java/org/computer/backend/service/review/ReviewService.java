package org.computer.backend.service.review;

import org.computer.entity.entity.Review;

import java.util.List;
import java.util.UUID;

public interface ReviewService {
    List<Review> findByProductId(UUID productId);
    Review save(Review review);
}

