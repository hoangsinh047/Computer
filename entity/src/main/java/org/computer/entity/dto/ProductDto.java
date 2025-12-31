package org.computer.entity.dto;

import java.math.BigDecimal;
import java.util.UUID;

public class ProductDto extends BaseDto {
    private String name;
    private String description;
    private BigDecimal price;
    private UUID brandId;
    private UUID categoryId;

    public ProductDto() {
    }

    public ProductDto(UUID id, java.time.Instant createdAt, java.time.Instant updatedAt, String name, String description, BigDecimal price, UUID brandId, UUID categoryId) {
        super(id, createdAt, updatedAt);
        this.name = name;
        this.description = description;
        this.price = price;
        this.brandId = brandId;
        this.categoryId = categoryId;
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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public UUID getBrandId() {
        return brandId;
    }

    public void setBrandId(UUID brandId) {
        this.brandId = brandId;
    }

    public UUID getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(UUID categoryId) {
        this.categoryId = categoryId;
    }
}
