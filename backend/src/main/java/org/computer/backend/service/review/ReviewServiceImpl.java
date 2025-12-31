package org.computer.backend.service.review;

import org.computer.backend.repository.review.ReviewRepository;
import org.computer.entity.entity.Review;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public List<Review> findByProductId(java.util.UUID productId) {
        return reviewRepository.findByProductId(productId);
    }

    @Override
    @Transactional
    public Review save(Review review) {
        return reviewRepository.save(review);
    }
}

