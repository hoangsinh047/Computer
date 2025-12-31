package org.computer.entity.dto;

import java.util.UUID;

/**
 * DTO for ProductSpec. The value is kept as Object to mirror JSON/JSONB content.
 */
public class ProductSpecDto extends BaseDto {
    private UUID productId;
    private String key;
    private Object value;

    public ProductSpecDto() {
    }

    public ProductSpecDto(UUID id, java.time.Instant createdAt, java.time.Instant updatedAt, UUID productId, String key, Object value) {
        super(id, createdAt, updatedAt);
        this.productId = productId;
        this.key = key;
        this.value = value;
    }

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(UUID productId) {
        this.productId = productId;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "ProductSpecDto{" +
                "id=" + getId() +
                ", productId=" + productId +
                ", key='" + key + '\'' +
                ", value=" + value +
                '}';
    }
}

