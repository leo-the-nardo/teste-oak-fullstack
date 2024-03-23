package com.leothenardo.oak.entities;

import com.leothenardo.oak._exceptions.EntityValidationException;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.UUID;

@Getter
@Setter
@Entity
public class Product {
	@Id
	private String id;
	private String name;
	private String description;
	private Float price;
	private boolean availableToSell;

	public Product() {
	}

	protected Product(String id, String name, String description, Float price, boolean availableToSell) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.availableToSell = availableToSell;
	}

	public static Product create(String name, String description, Float price, boolean availableToSell) {
		var product = new Product(UUID.randomUUID().toString(), name, description, price, availableToSell);
		product.validate();
		return product;
	}

	public void validate() {
		var validationErrors = new ArrayList<String>();
		if (id == null || id.isBlank()) {
			validationErrors.add("Id is required");
		}
		if (name == null || name.isBlank()) {
			validationErrors.add("Name is required");
		}
		if (price == null || price <= 0) {
			validationErrors.add("Price must be greater than 0");
		}
		if (!validationErrors.isEmpty()) {
			throw new EntityValidationException(validationErrors);
		}
	}
}
