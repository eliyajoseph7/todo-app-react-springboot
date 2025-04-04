package com.todoapplication.todo.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todoapplication.todo.dto.LoginRequest;
import com.todoapplication.todo.dto.RegisterRequest;
import com.todoapplication.todo.services.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {

    @Autowired
    private AuthService authService;

    // public AuthController(AuthService authService) {
    // this.authService = authService;
    // }

    @PostMapping("register")
    public ResponseEntity<Object> registerUser(@RequestBody RegisterRequest request) {
        Object response = authService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("login")
    public ResponseEntity<Object> postMethodName(@RequestBody LoginRequest request) {
        Object resp = authService.login(request);
        return ResponseEntity.ok(resp);
    }

}
