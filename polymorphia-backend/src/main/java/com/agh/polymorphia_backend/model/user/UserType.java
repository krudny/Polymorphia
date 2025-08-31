package com.agh.polymorphia_backend.model.user;

import org.springframework.security.core.GrantedAuthority;

public enum UserType implements GrantedAuthority {
    STUDENT,
    INSTRUCTOR,
    COORDINATOR;

    @Override
    public String getAuthority() {
        return name();
    }
}
