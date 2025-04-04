package com.todoapplication.todo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todoapplication.todo.models.JwtConfig;
import com.todoapplication.todo.repositories.JwtConfigRepository;

import jakarta.transaction.Transactional;

@Service
public class JwtConfigService {

    @Autowired
    private JwtConfigRepository jwtConfigRepository;

    public JwtConfig geJwtConfig() {
        JwtConfig jwtConfig = jwtConfigRepository.findById(1L).orElse(null);
        // If not found, create a default one
        // and save it to the database
        if (jwtConfig == null) {
            jwtConfig = new JwtConfig();
            jwtConfig.setSecretKey("659jAz8aNsm35D9UGCKjHzr4eo/jPNIqYuEGyFVnPEM=");
            jwtConfig.setExpirationTime(3600000L); // default 1 hour
            jwtConfigRepository.save(jwtConfig);
        }
        return jwtConfig;
    }

    @Transactional
    public void updateJwtConfig(JwtConfig jwtConfig) {
        JwtConfig existingConfig = jwtConfigRepository.findById(1L).orElse(null);
        if (existingConfig != null) {
            existingConfig.setSecretKey(jwtConfig.getSecretKey());
            existingConfig.setExpirationTime(jwtConfig.getExpirationTime());
            jwtConfigRepository.save(existingConfig);
        }
    }
    public void deleteJwtConfig(Long id) {
        JwtConfig jwtConfig = jwtConfigRepository.findById(id).orElse(null);
        if (jwtConfig == null) {
            throw new RuntimeException("JwtConfig not found");
        }
        jwtConfigRepository.delete(jwtConfig);
    }
}

