package com.in6225.expense.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.in6225.expense.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense,Long> {
	
}