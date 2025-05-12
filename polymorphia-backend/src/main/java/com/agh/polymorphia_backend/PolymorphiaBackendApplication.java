package com.agh.polymorphia_backend;

import com.agh.polymorphia_backend.config.CorsProperties;
import com.agh.polymorphia_backend.config.InitialUserProperties;
import com.agh.polymorphia_backend.config.StaticFileServerProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties({StaticFileServerProperties.class, CorsProperties.class, InitialUserProperties.class})
@SpringBootApplication
public class PolymorphiaBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(PolymorphiaBackendApplication.class, args);
    }

}
