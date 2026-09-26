package com.agh.polymorphia_backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Collections;
import java.util.List;

@ConfigurationProperties(prefix = "polymorphia.code-executor.unsafe-process")
public record UnsafeProcessProperties(List<String> allowedPrincipals) {
    public UnsafeProcessProperties {
        if (allowedPrincipals == null) {
            allowedPrincipals = Collections.emptyList();
        }
    }
}
