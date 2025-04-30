package com.agh.polymorphia_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class Util {

    public static ResponseEntity<Void> getCreatedResponseEntity(Long id) {
        return ResponseEntity.created(
                        ServletUriComponentsBuilder.fromCurrentRequest()
                                .path("/{id}")
                                .buildAndExpand(id)
                                .toUri()
                )
                .build();
    }
}
