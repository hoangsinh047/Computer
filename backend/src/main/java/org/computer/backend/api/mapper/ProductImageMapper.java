package org.computer.backend.api.mapper;

import org.computer.entity.dto.ProductImageDto;
import org.computer.entity.entity.ProductImage;

public class ProductImageMapper {
    public static ProductImageDto toDto(ProductImage img) {
        if (img == null) return null;
        return new ProductImageDto(img.getId(), img.getCreatedAt(), img.getUpdatedAt(), img.getUrl(), img.getProduct() != null ? img.getProduct().getId() : null);
    }

    public static ProductImage toEntity(ProductImageDto dto) {
        if (dto == null) return null;
        ProductImage img = new ProductImage();
        img.setUrl(dto.getUrl());
        img.setAltText(dto.getAltText());
        if (dto.getProductId() != null) {
            org.computer.entity.entity.Product p = new org.computer.entity.entity.Product();
            p.setId(dto.getProductId());
            img.setProduct(p);
        }
        return img;
    }
}

