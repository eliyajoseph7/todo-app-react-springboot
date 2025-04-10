package com.todoapplication.todo.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todoapplication.todo.dto.TodoDTO;
import com.todoapplication.todo.models.Todo;
import com.todoapplication.todo.models.User;
import com.todoapplication.todo.repositories.UserRepository;
import com.todoapplication.todo.services.TodoService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;
    private UserRepository userRepository;

    public TodoController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<TodoDTO>> getTodos(@RequestParam User user) {
        List<TodoDTO> todos = todoService.getUserTodos(user).stream().map(TodoDTO::new).collect(Collectors.toList());
        
        return ResponseEntity.ok(todos);
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo, @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        // System.out.println("Authenticated User: " + username);

        // Fetch full User entity from database
        User user = userRepository.findByUsernameOrEmail(username, username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Todo newTodo = todoService.createTodo(todo, user);
        return ResponseEntity.ok(newTodo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo updateTodo,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();

        // Fetch full User entity from database
        User currentUser = userRepository.findByUsernameOrEmail(username, username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Todo todo = todoService.updateTodo(id, updateTodo, currentUser);

        return ResponseEntity.ok(todo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();

        // Fetch full User entity from database
        User currentUser = userRepository.findByUsernameOrEmail(username, username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        todoService.deleteTodo(id, currentUser);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<Void> completeTodo(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        // Fetch full User entity from database
        User currentUser = userRepository.findByUsernameOrEmail(username, username).orElseThrow(() -> new RuntimeException("User not found"));
        
        todoService.markTodoAsCompleted(id, currentUser);
        
        return ResponseEntity.ok().build();
    }

    @GetMapping("/completed")
    public ResponseEntity<List<TodoDTO>> getCompletedTodos(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        // Fetch full User entity from database
        User currentUser = userRepository.findByUsernameOrEmail(username, username).orElseThrow(() -> new RuntimeException("User not found"));
        
        // List<TodoDTO> completedTodos = todoService.getUserTodos(currentUser).stream()
        //         .filter(Todo::isCompleted)
        //         .map(TodoDTO::new)
        //         .collect(Collectors.toList());

        List<TodoDTO> completedTodos = todoService.getCompleteTodos(currentUser);
        
        return ResponseEntity.ok(completedTodos);
    }
    
}
