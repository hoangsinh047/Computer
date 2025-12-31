package org.computer.backend.api.mapper;

import org.computer.entity.dto.BrandDto;
import org.computer.entity.entity.Brand;

public class BrandMapper {
    public static BrandDto toDto(Brand b) {
        if (b == null) return null;
        BrandDto dto = new BrandDto(b.getId(), b.getCreatedAt(), b.getUpdatedAt(), b.getName());
        dto.setDescription(b.getDescription());
        // productIds omitted (would require fetching)
        return dto;
    }

    public static Brand toEntity(BrandDto dto) {
        if (dto == null) return null;
        Brand b = new Brand();
        b.setId(dto.getId());
        b.setName(dto.getName());
        b.setDescription(dto.getDescription());
        return b;
    }
}

