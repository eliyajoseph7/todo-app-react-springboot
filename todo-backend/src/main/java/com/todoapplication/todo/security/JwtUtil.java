package com.todoapplication.todo.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.todoapplication.todo.repositories.JwtConfigRepository;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey secretKey;
    
    public JwtUtil(@Value("${jwt.secret}") String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
        this.jwtConfigRepository = null;
    }
    
    
    private final JwtConfigRepository jwtConfigRepository;
    @Autowired
    public JwtUtil(@Value("${jwt.secret}") String secret, JwtConfigRepository jwtConfigRepository) {
        String secretKey = jwtConfigRepository.findById(1L).map(config -> config.getSecretKey()).orElse(secret);
        this.secretKey = Keys.hmacShaKeyFor(secretKey.getBytes());
        this.jwtConfigRepository = jwtConfigRepository;
    }

    public String generateToken(String username) {
        Long jwtExpiration = jwtConfigRepository.findById((long) 1)
            .map(config -> config.getExpirationTime())
            .orElse(3600000L); // default 1 hour if not found in DB

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(secretKey)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }

    public Long extractExpirationTime(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .getTime();
    }
}
