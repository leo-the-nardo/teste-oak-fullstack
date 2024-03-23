package com.leothenardo.oak.repositories;

import com.leothenardo.oak.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface ProductRepository extends JpaRepository<Product, String> {
}
