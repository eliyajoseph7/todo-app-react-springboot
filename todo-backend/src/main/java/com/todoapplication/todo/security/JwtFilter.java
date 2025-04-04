// This class is for token authentication

package com.todoapplication.todo.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public JwtFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain chain)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();
        if (requestURI.startsWith("/api/auth")) {
            System.out.println("Skipping JWT filter for " + requestURI); // Add logging here
            chain.doFilter(request, response); // Pass request through without filtering
            return;
        }

        String token = request.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            String jwt = token.substring(7);
            String username = jwtUtil.extractUsername(jwt);

            if (username != null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                System.err.println(userDetails);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        chain.doFilter(request, response);
    }
}
