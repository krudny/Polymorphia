package com.agh.polymorphia_backend.service.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class GeneralMapper {
    public Map<String, String> stringToMap(String inputString) {
        try {
            return new ObjectMapper().readValue(inputString, new TypeReference<>() {
            });
        } catch (JsonProcessingException e) {
            throw new RuntimeException("String is not in JSON format: " + e.getMessage());
        }
    }
}
