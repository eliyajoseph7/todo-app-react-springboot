package com.todoapplication.todo.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.todoapplication.todo.models.Todo;
import com.todoapplication.todo.models.User;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUser(User user, Sort sort);

}
