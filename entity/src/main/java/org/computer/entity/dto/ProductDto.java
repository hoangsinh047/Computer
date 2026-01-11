package org.computer.entity.dto;

import java.math.BigDecimal;
import java.util.UUID;

public class ProductDto extends BaseDto {
    private String name;
    private String description;
    private BigDecimal price;
    private UUID brandId;
    private UUID categoryId;
    private String sku;
    private Integer stockQuantity;
    private Integer warrantyMonths;
    private String status;
    private BigDecimal discount;
    private String brandName;
    private String categoryName;

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

    public java.math.BigDecimal getPrice() {
        return price;
    }

    public void setPrice(java.math.BigDecimal price) {
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

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public Integer getWarrantyMonths() {
        return warrantyMonths;
    }

    public void setWarrantyMonths(Integer warrantyMonths) {
        this.warrantyMonths = warrantyMonths;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
