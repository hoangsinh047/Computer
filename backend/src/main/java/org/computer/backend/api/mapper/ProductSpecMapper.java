package org.computer.backend.api.mapper;

import org.computer.entity.dto.ProductSpecDto;
import org.computer.entity.entity.ProductSpec;

public class ProductSpecMapper {
    public static ProductSpecDto toDto(ProductSpec s) {
        if (s == null) return null;
        ProductSpecDto dto = new ProductSpecDto(s.getId(), s.getCreatedAt(), s.getUpdatedAt(), s.getProduct() != null ? s.getProduct().getId() : null, s.getKey(), s.getValue());
        return dto;
    }

    public static ProductSpec toEntity(ProductSpecDto dto) {
        if (dto == null) return null;
        ProductSpec spec = new ProductSpec();
        if (dto.getProductId() != null) {
            org.computer.entity.entity.Product p = new org.computer.entity.entity.Product();
            p.setId(dto.getProductId());
            spec.setProduct(p);
        }
        spec.setKey(dto.getKey());
        spec.setValue(dto.getValue());
        return spec;
    }
}

