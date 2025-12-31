package org.computer.backend.api;

import org.computer.backend.api.mapper.BrandMapper;
import org.computer.backend.service.brand.BrandService;
import org.computer.entity.dto.BrandDto;
import org.computer.entity.entity.Brand;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/brands")
@Validated
public class BrandController {

    private final BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping
    public ResponseEntity<List<BrandDto>> list() {
        List<org.computer.entity.entity.Brand> brands = brandService.findBrandsWithProducts();
        List<BrandDto> dtos = brands.stream().map(BrandMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BrandDto> getById(@PathVariable UUID id) {
        Optional<Brand> b = brandService.findById(id);
        return b.map(BrandMapper::toDto).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BrandDto> create(@Valid @RequestBody BrandDto dto) {
        Brand b = BrandMapper.toEntity(dto);
        Brand saved = brandService.save(b);
        return ResponseEntity.status(201).body(BrandMapper.toDto(saved));
    }
}
