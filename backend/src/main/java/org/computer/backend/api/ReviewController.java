package org.computer.backend.api;

import org.computer.backend.api.mapper.ReviewMapper;
import org.computer.backend.service.review.ReviewService;
import org.computer.entity.dto.ReviewDto;
import org.computer.entity.entity.Review;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reviews")
@Validated
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewDto>> listByProduct(@PathVariable UUID productId) {
        List<Review> list = reviewService.findByProductId(productId);
        List<ReviewDto> dtos = list.stream().map(ReviewMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<ReviewDto> create(@Valid @RequestBody ReviewDto dto) {
        Review r = ReviewMapper.toEntity(dto);
        Review saved = reviewService.save(r);
        return ResponseEntity.status(201).body(ReviewMapper.toDto(saved));
    }
}
