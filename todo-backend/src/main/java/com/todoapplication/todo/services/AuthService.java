package com.todoapplication.todo.services;

import java.util.Map;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.todoapplication.todo.dto.LoginRequest;
import com.todoapplication.todo.dto.RegisterRequest;
import com.todoapplication.todo.models.Role;
import com.todoapplication.todo.models.User;
import com.todoapplication.todo.repositories.UserRepository;
import com.todoapplication.todo.security.JwtUtil;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager, UserDetailsService userDetailsService, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    public Object register(RegisterRequest request) {
        if (userRepository.findByUsernameOrEmail(request.getUsername(), request.getEmail()).isPresent()) {
            return "User with this username or email already exists!";
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setFullName(request.getFull_name());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        userRepository.save(user);

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), request.getPassword()));
        // load user details and generate jwt
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        String token = jwtUtil.generateToken(userDetails.getUsername());
        Map<String, Object> response = Map.of(
                "status", 200,
                "message", "User registered successfully!",
                "token", token,
                "user", Map.of(
                        "id", user.getId(),
                        "username", user.getUsername(),
                        "email", user.getEmail(),
                        "full_name", user.getFullName()),
                "token_expiry", jwtUtil.extractExpirationTime(token)); // token expiry time in milliseconds
        /* in case i want to return how many milliseconds remains for token to expire i will add  - System.currentTimeMillis()*/
        return response;

    }

    public Object login(LoginRequest request) {
        Optional<User> userOptional = userRepository.findByUsernameOrEmail(request.getUsernameOrEmail(),
                request.getUsernameOrEmail());

        if (userOptional.isEmpty() || userOptional.isEmpty()
                && !passwordEncoder.matches(request.getPassword(), userOptional.get().getPassword())) {
            throw new RuntimeException("Invalid username/email or password");
        }

        // authenticate user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userOptional.get().getUsername(), request.getPassword()));

        // load user details and generate jwt
        UserDetails userDetails = userDetailsService.loadUserByUsername(userOptional.get().getUsername());
        String token = jwtUtil.generateToken(userDetails.getUsername());
        Map<String, Object> response = Map.of(
                "status", 200,
                "message", "User logged in successfully!",
                "token", token,
                "user", Map.of(
                        "id", userOptional.get().getId(),
                        "username", userOptional.get().getUsername(),
                        "email", userOptional.get().getEmail(),
                        "full_name", userOptional.get().getFullName()),
                "token_expiry", jwtUtil.extractExpirationTime(token)); // token expiry time in milliseconds
                /* in case i want to return how many milliseconds remains for token to expire i will add  - System.currentTimeMillis()*/
        return response;
    }
}
