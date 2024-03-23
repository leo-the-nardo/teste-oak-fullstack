package com.leothenardo.oak.dtos;

import com.leothenardo.oak.entities.Product;

public record ProductDTO(String id, String name, String description, Float price) {

	static public ProductDTO from(Product product) {
		return new ProductDTO(product.getId(), product.getName(), product.getDescription(), product.getPrice());
	}
}
