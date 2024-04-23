package com.in6225.expense.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@NoArgsConstructor
@Table(name="category")
@Data
public class Category {
	
	@Id
	private Long id;

	@NonNull
	private String name;

}