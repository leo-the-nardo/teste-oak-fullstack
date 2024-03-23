package com.leothenardo.oak.controllers;

import com.leothenardo.oak.dtos.ProductDTO;
import com.leothenardo.oak.services.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Component
@RestController
@RequestMapping("/products")
public class ProductController {
	private final ProductService productService;

	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	@GetMapping
	public ResponseEntity<Page<ProductDTO>> list(@RequestParam(defaultValue = "0") Integer page) {
		return ResponseEntity.ok().body(this.productService.list(page));
	}
}
