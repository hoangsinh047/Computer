package org.computer.entity.dto;

import java.util.UUID;

/**
 * DTO for Review
 */
public class ReviewDto extends BaseDto {
    private UUID userId;
    private UUID productId;
    private int rating;
    private String comment;

    public ReviewDto() {
    }

    public ReviewDto(UUID id, java.time.Instant createdAt, java.time.Instant updatedAt, UUID userId, UUID productId, int rating) {
        super(id, createdAt, updatedAt);
        this.userId = userId;
        this.productId = productId;
        this.rating = rating;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(UUID productId) {
        this.productId = productId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public String toString() {
        return "ReviewDto{" +
                "id=" + getId() +
                ", userId=" + userId +
                ", productId=" + productId +
                ", rating=" + rating +
                '}';
    }
}

