package com.todoapplication.todo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RegisterRequest {
    private String username;
    private String full_name;
    private String email;
    private String password;
}
