package com.leothenardo.oak.controllers;

import com.leothenardo.oak.dtos.CreateProductInputDTO;
import com.leothenardo.oak.dtos.ProductDTO;
import com.leothenardo.oak.services.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@Component
@RestController
@RequestMapping("/products")
public class ProductController {
	private final ProductService productService;

	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	@GetMapping
	public ResponseEntity<Page<ProductDTO>> list(
					@RequestParam(defaultValue = "0") Integer page,
					@RequestParam(defaultValue = "price") String orderBy,
					@RequestParam(defaultValue = "ASC") String dir
	) {
		return ResponseEntity.ok().body(this.productService.list(page, orderBy, dir));
	}

	@PostMapping
	public ResponseEntity<ProductDTO> create(@RequestBody CreateProductInputDTO productDTO) {
		return ResponseEntity.ok().body(this.productService.create(productDTO));
	}
}
