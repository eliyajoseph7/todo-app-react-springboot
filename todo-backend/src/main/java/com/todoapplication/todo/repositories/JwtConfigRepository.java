package com.todoapplication.todo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todoapplication.todo.models.JwtConfig;

public interface JwtConfigRepository extends JpaRepository<JwtConfig, Long> {
    
}
