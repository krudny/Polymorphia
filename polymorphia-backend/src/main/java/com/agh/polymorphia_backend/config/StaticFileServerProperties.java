package com.agh.polymorphia_backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "static-file-server")
public record StaticFileServerProperties(String rootDir) {
}
