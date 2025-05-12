package com.agh.polymorphia_backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "initial.user")
public record InitialUserProperties (String firstName, String lastName, String email, String password) {
}
