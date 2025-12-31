package org.computer.backend.api;

import org.computer.backend.api.mapper.ProductSpecMapper;
import org.computer.backend.service.productspec.ProductSpecService;
import org.computer.entity.dto.ProductSpecDto;
import org.computer.entity.entity.ProductSpec;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product-specs")
@Validated
public class ProductSpecController {

    private final ProductSpecService productSpecService;

    public ProductSpecController(ProductSpecService productSpecService) {
        this.productSpecService = productSpecService;
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ProductSpecDto>> listByProduct(@PathVariable UUID productId) {
        List<ProductSpec> specs = productSpecService.findByProductId(productId);
        List<ProductSpecDto> dtos = specs.stream().map(ProductSpecMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<ProductSpecDto> create(@Valid @RequestBody ProductSpecDto dto) {
        ProductSpec spec = ProductSpecMapper.toEntity(dto);
        ProductSpec saved = productSpecService.save(spec);
        return ResponseEntity.status(201).body(ProductSpecMapper.toDto(saved));
    }
}

