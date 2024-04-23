package com.in6225.expense.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.in6225.expense.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{

	Category findByName(String name);
}
