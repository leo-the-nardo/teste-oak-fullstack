package com.leothenardo.oak.services;

import com.leothenardo.oak.dtos.CreateProductInputDTO;
import com.leothenardo.oak.dtos.ProductDTO;
import com.leothenardo.oak.entities.Product;
import com.leothenardo.oak.repositories.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Component
public class ProductService {
	private final ProductRepository productRepository;

	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	public Page<ProductDTO> list(Integer page, String orderBy, String direction) {
		if (page < 0) throw new IllegalArgumentException("Page must be greater than 0");
		var sort = Sort.by(Sort.Direction.fromString(direction), orderBy);
		var pageable = PageRequest.of(page, 6, sort);
		var products = productRepository.findAll(pageable);
		return products.map(ProductDTO::from);
	}

	@Transactional
	public ProductDTO create(CreateProductInputDTO productDTO) {
		var isAvailable = Objects.equals(productDTO.availableToSell(), "yes");
		var product = Product.create(productDTO.name(), productDTO.description(), productDTO.price(), isAvailable);
		product = productRepository.save(product);
		return ProductDTO.from(product);
	}
}
