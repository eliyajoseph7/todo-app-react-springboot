package com.todoapplication.todo.repositories;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todoapplication.todo.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsernameOrEmail(String username, String email);
}
