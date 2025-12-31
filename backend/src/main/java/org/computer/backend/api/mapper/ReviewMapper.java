package org.computer.backend.api.mapper;

import org.computer.entity.dto.ReviewDto;
import org.computer.entity.entity.Review;

public class ReviewMapper {
    public static ReviewDto toDto(Review r) {
        if (r == null) return null;
        ReviewDto dto = new ReviewDto(r.getId(), r.getCreatedAt(), r.getUpdatedAt(), r.getUser() != null ? r.getUser().getId() : null, r.getProduct() != null ? r.getProduct().getId() : null, r.getRating());
        dto.setComment(r.getComment());
        return dto;
    }

    public static Review toEntity(ReviewDto dto) {
        if (dto == null) return null;
        Review r = new Review();
        r.setRating(dto.getRating());
        r.setComment(dto.getComment());
        if (dto.getUserId() != null) {
            org.computer.entity.entity.User u = new org.computer.entity.entity.User();
            u.setId(dto.getUserId());
            r.setUser(u);
        }
        if (dto.getProductId() != null) {
            org.computer.entity.entity.Product p = new org.computer.entity.entity.Product();
            p.setId(dto.getProductId());
            r.setProduct(p);
        }
        return r;
    }
}
