package com.todoapplication.todo.dto;

import java.time.Instant;

import com.todoapplication.todo.models.Todo;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class TodoDTO {
    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private String created_by; // Instead of full User object
    private Instant created_at;

    public TodoDTO(Todo todo) {
        this.id = todo.getId();
        this.title = todo.getTitle();
        this.description = todo.getDescription();
        this.completed = todo.isCompleted();
        this.created_by = todo.getUser().getUsername(); // Avoids recursion
        this.created_at = todo.getCreatedAt();
    }
}

