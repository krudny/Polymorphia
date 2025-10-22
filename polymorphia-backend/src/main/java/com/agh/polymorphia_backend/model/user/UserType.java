package com.agh.polymorphia_backend.model.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@Getter
@RequiredArgsConstructor
public enum UserType implements GrantedAuthority {
    STUDENT("Student"),
    INSTRUCTOR("Prowadzący"),
    COORDINATOR("Koordynator"),
    UNDEFINED("Nieokreślony");

    private final String displayName;

    @Override
    public String getAuthority() {
        return name();
    }
}
