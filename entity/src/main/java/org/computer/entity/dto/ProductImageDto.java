package org.computer.entity.dto;

import java.util.UUID;

/**
 * DTO for ProductImage
 */
public class ProductImageDto extends BaseDto {
    private String url;
    private String altText;
    private UUID productId;

    public ProductImageDto() {
    }

    public ProductImageDto(UUID id, java.time.Instant createdAt, java.time.Instant updatedAt, String url, UUID productId) {
        super(id, createdAt, updatedAt);
        this.url = url;
        this.productId = productId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getAltText() {
        return altText;
    }

    public void setAltText(String altText) {
        this.altText = altText;
    }

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(UUID productId) {
        this.productId = productId;
    }

    @Override
    public String toString() {
        return "ProductImageDto{" +
                "id=" + getId() +
                ", url='" + url + '\'' +
                ", productId=" + productId +
                '}';
    }
}

