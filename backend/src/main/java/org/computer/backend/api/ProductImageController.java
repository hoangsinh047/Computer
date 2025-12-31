package org.computer.backend.api;

import org.computer.backend.api.mapper.ProductImageMapper;
import org.computer.backend.service.productimage.ProductImageService;
import org.computer.entity.dto.ProductImageDto;
import org.computer.entity.entity.ProductImage;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product-images")
@Validated
public class ProductImageController {

    private final ProductImageService productImageService;

    public ProductImageController(ProductImageService productImageService) {
        this.productImageService = productImageService;
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ProductImageDto>> listByProduct(@PathVariable UUID productId) {
        List<ProductImage> imgs = productImageService.findByProductId(productId);
        List<ProductImageDto> dtos = imgs.stream().map(ProductImageMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<ProductImageDto> create(@Valid @RequestBody ProductImageDto dto) {
        ProductImage img = ProductImageMapper.toEntity(dto);
        ProductImage saved = productImageService.save(img);
        return ResponseEntity.status(201).body(ProductImageMapper.toDto(saved));
    }
}
