package com.in6225.expense.controller;

import java.util.Collection;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.in6225.expense.model.Category;
import com.in6225.expense.repository.CategoryRepository;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

	private CategoryRepository categoryRepository;

	public CategoryController(CategoryRepository categoryRepository) {
		super();
		this.categoryRepository = categoryRepository;
	}

	@GetMapping
	Collection<Category> categories() {
		return categoryRepository.findAll();
	}
	
	@GetMapping("/countAll")
	Long getCategoriesCounts() {
		return categoryRepository.count();
	}
}
