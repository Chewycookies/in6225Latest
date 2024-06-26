package com.in6225.expense.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.in6225.expense.model.Expense;
import com.in6225.expense.repository.ExpenseRepository;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
	
	@Autowired
	ExpenseRepository expenseRepository;
	
	@GetMapping
	List<Expense> getExpenses() {
		return expenseRepository.findAll();
	}
	
	@GetMapping("/countAll")
	Long getExpensesCount() {
		return expenseRepository.count();
	}
	
	@DeleteMapping("/{id}")
	ResponseEntity<?> deleteExpenses(@PathVariable Long id) {
		expenseRepository.deleteById(id);
		
		return ResponseEntity.ok().build();
	}
	
	@PostMapping
	ResponseEntity<Expense> createExpense(@Valid @RequestBody Expense expense) throws URISyntaxException {
		Expense result = expenseRepository.save(expense);
		return ResponseEntity.created(new URI("/api/expenses" + result.getId())).body(result);
	}

}
