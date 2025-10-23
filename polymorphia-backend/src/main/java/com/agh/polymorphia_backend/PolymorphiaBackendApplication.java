package com.agh.polymorphia_backend;

import com.agh.polymorphia_backend.config.CorsProperties;
import com.agh.polymorphia_backend.config.InitialUserProperties;
import com.agh.polymorphia_backend.config.StaticFileServerProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.scheduling.annotation.EnableScheduling;

import static org.springframework.data.web.config.EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO;

@EnableConfigurationProperties({StaticFileServerProperties.class, CorsProperties.class, InitialUserProperties.class})
@EnableSpringDataWebSupport(pageSerializationMode = VIA_DTO)
@EnableScheduling
@SpringBootApplication
public class PolymorphiaBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(PolymorphiaBackendApplication.class, args);
    }

}
