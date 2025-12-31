package org.computer.backend.api.mapper;

import org.computer.entity.dto.ProductCreateDto;
import org.computer.entity.dto.ProductDto;
import org.computer.entity.dto.ProductUpdateDto;
import org.computer.entity.entity.Brand;
import org.computer.entity.entity.Category;
import org.computer.entity.entity.Product;

public class ProductMapper {

    public static ProductDto toDto(Product p) {
        if (p == null) return null;
        return new ProductDto(
                p.getId(),
                p.getCreatedAt(),
                p.getUpdatedAt(),
                p.getName(),
                p.getDescription(),
                p.getPrice(),
                p.getBrand() != null ? p.getBrand().getId() : null,
                p.getCategory() != null ? p.getCategory().getId() : null
        );
    }

    public static Product toEntity(ProductCreateDto dto) {
        if (dto == null) return null;
        Product p = new Product();
        p.setName(dto.getName());
        p.setDescription(dto.getDescription());
        p.setPrice(dto.getPrice());
        if (dto.getBrandId() != null) {
            Brand b = new Brand();
            b.setId(dto.getBrandId());
            p.setBrand(b);
        }
        if (dto.getCategoryId() != null) {
            Category c = new Category();
            c.setId(dto.getCategoryId());
            p.setCategory(c);
        }
        return p;
    }

    public static void updateEntityFromDto(ProductUpdateDto dto, Product existing) {
        if (dto.getName() != null) existing.setName(dto.getName());
        if (dto.getDescription() != null) existing.setDescription(dto.getDescription());
        if (dto.getPrice() != null) existing.setPrice(dto.getPrice());
        if (dto.getBrandId() != null) {
            Brand b = new Brand();
            b.setId(dto.getBrandId());
            existing.setBrand(b);
        }
        if (dto.getCategoryId() != null) {
            Category c = new Category();
            c.setId(dto.getCategoryId());
            existing.setCategory(c);
        }
    }
}
