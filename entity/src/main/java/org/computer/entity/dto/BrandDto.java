package org.computer.entity.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * DTO for Brand entity
 */
public class BrandDto extends BaseDto {
    private String name;
    private String description;
    private List<UUID> productIds = new ArrayList<>();

    public BrandDto() {
    }

    public BrandDto(UUID id, java.time.Instant createdAt, java.time.Instant updatedAt, String name) {
        super(id, createdAt, updatedAt);
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<UUID> getProductIds() {
        return productIds;
    }

    public void setProductIds(List<UUID> productIds) {
        this.productIds = productIds;
    }

    @Override
    public String toString() {
        return "BrandDto{" +
                "id=" + getId() +
                ", name='" + name + '\'' +
                '}';
    }
}

