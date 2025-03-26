package com.agh.polymorphia_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping
    public ResponseEntity<Map<String, String>> testController() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Jak to widzisz to znaczy, że backend też działa :))");

        return ResponseEntity.ok(response);
    }
}
