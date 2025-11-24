package com.agh.polymorphia_backend.service.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
public class GeneralMapper {
    public static final String NOT_JSON = "String nie jest w formacie JSON.";

    public Map<String, String> stringToMap(String inputString) {
        try {
            return new ObjectMapper().readValue(inputString, new TypeReference<>() {
            });
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, NOT_JSON);
        }
    }
}
