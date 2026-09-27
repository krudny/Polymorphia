package com.agh.polymorphia_backend.service.task.remote_client;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Collections;
import java.util.List;

@ConfigurationProperties(prefix = "code-executor.unsafe-process")
public record UnsafeProcessConfig(List<String> allowedPrincipals) {
    public UnsafeProcessConfig
    {
        if (allowedPrincipals == null) {
            allowedPrincipals = Collections.emptyList();
        }
    }
}
