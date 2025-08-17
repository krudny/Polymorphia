package com.agh.polymorphia_backend.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {
    public boolean hasAnyRole(List<GrantedAuthority> roles) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if ((auth == null) || !auth.isAuthenticated()){
            return false;
        }

        return auth.getAuthorities().stream().anyMatch(roles::contains);
    }
}
