package com.todoapplication.todo.services;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.todoapplication.todo.models.User;
import com.todoapplication.todo.repositories.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);

        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found with username or email: " + usernameOrEmail);
        }

        User user = userOptional.get();

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername()) // use username for authentication
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
    }
}
