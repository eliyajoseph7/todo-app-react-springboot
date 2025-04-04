
package com.todoapplication.todo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todoapplication.todo.exception.ResourceNotFoundException;
import com.todoapplication.todo.exception.UnauthorizedException;
import com.todoapplication.todo.models.Role;
import com.todoapplication.todo.models.Todo;
import com.todoapplication.todo.models.User;
import com.todoapplication.todo.repositories.TodoRepository;
import com.todoapplication.todo.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class TodoService {
    @Autowired
    TodoRepository todoRepository;

    @Autowired
    UserRepository userRepository;

    public List<Todo> getUserTodos(User user) {
        if (user.getRole() == Role.ADMIN) {
            return todoRepository.findAll();
        } else {
            return todoRepository.findByUser(user);
        }
    }

    public Todo createTodo(Todo todo, User user) {
        todo.setUser(user);
        return todoRepository.save(todo);
    }

    @Transactional
    public Todo updateTodo(Long todoId, Todo updatedTodo, User currentUser) {
        Todo existingTodo = todoRepository.findById(todoId).orElseThrow(() -> new ResourceNotFoundException("Todo not found!"));

        if (currentUser.getRole() != Role.ADMIN && existingTodo.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("You don't own this Todo");
        }

        existingTodo.setTitle(updatedTodo.getTitle());
        existingTodo.setDescription(updatedTodo.getDescription());
        existingTodo.setCompleted(updatedTodo.isCompleted());
        return todoRepository.save(existingTodo);
    }

    public void deleteTodo(Long todoId, User currentUser) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(() -> new ResourceNotFoundException("Record not found!"));

        // check whether user deleting todo is either admin or owner
        if (todo.getUser().getId().equals(currentUser.getId()) || currentUser.getRole() == Role.ADMIN) {
            todoRepository.delete(todo);
        } else {
            throw new UnauthorizedException("You are not allowed to delete this Todo.");
        }
    }

}