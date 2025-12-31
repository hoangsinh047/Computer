package org.computer.backend.api;

import org.computer.backend.api.mapper.ProductMapper;
import org.computer.backend.service.product.ProductService;
import org.computer.entity.dto.ProductCreateDto;
import org.computer.entity.dto.ProductDto;
import org.computer.entity.dto.ProductUpdateDto;
import org.computer.entity.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@Validated
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/ping")
    public String ping() {
        return "product-api-pong";
    }

    @GetMapping
    public ResponseEntity<Page<ProductDto>> list(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = productService.findAll(pageable);
        List<ProductDto> dtos = products.stream().map(ProductMapper::toDto).collect(Collectors.toList());
        Page<ProductDto> dtoPage = new PageImpl<>(dtos, pageable, products.getTotalElements());
        return ResponseEntity.ok(dtoPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getById(@PathVariable UUID id) {
        return productService.findById(id)
                .map(ProductMapper::toDto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProductDto> create(@Valid @RequestBody ProductCreateDto dto) {
        Product p = ProductMapper.toEntity(dto);
        Product saved = productService.create(p);
        return ResponseEntity.status(HttpStatus.CREATED).body(ProductMapper.toDto(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> update(@PathVariable UUID id, @Valid @RequestBody ProductUpdateDto dto) {
        return productService.findById(id).map(existing -> {
            ProductMapper.updateEntityFromDto(dto, existing);
            Product updated = productService.update(id, existing).orElse(existing);
            return ResponseEntity.ok(ProductMapper.toDto(updated));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
