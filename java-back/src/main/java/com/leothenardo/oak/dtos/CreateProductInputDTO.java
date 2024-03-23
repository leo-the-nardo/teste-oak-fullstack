package com.leothenardo.oak.dtos;

public record CreateProductInputDTO(
				String name,
				String description,
				Float price,
				String availableToSell) {
}
