package com.leothenardo.oak.services;

import com.leothenardo.oak.dtos.ProductDTO;
import com.leothenardo.oak.repositories.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

@Component
public class ProductService {
	private final ProductRepository productRepository;

	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	public Page<ProductDTO> list(Integer page) {
		var pageable = PageRequest.of(page, 7);
		var products = productRepository.findAll(pageable);
		return products.map(ProductDTO::from);
	}
}
