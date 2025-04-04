package com.todoapplication.todo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todoapplication.todo.models.JwtConfig;
import com.todoapplication.todo.services.JwtConfigService;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/jwt-config")
public class JwtConfigController {

    @Autowired
    private JwtConfigService jwtConfigService;

    public JwtConfigController(JwtConfigService jwtConfigService) {
        this.jwtConfigService = jwtConfigService;
    }

    @GetMapping
    public JwtConfig geJwtConfig() {
        return jwtConfigService.geJwtConfig();
    }
}
