package com.agh.polymorphia_backend.exception.database;

import com.agh.polymorphia_backend.exception.CustomExceptionResponse;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.core.annotation.Order;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Order(1)
public class DatabaseExceptionHandler {
    private static final String DATA_ACCESS_EXCEPTION = "DataAccessException";
    private static final String RESOURCE_CONSTRAINT_VIOLATION = "ResourceConstraintViolationException";

    @ExceptionHandler({InvalidArgumentException.class, UnknownSubclassException.class})
    public ResponseEntity<CustomExceptionResponse> handleResourceNotFound(GeneralException ex) {
        CustomExceptionResponse customExceptionResponse = CustomExceptionResponse.builder()
                .title(ex.getTitle())
                .description(ex.getMessage())
                .build();
        return new ResponseEntity<>(customExceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<CustomExceptionResponse> handleResourceNotFound(DataAccessException ex) {
        ex.printStackTrace();
        CustomExceptionResponse customExceptionResponse = CustomExceptionResponse.builder()
                .title(DATA_ACCESS_EXCEPTION)
                .description(ex.getMessage())
                .build();
        return new ResponseEntity<>(customExceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({DataIntegrityViolationException.class, ConstraintViolationException.class})
    public ResponseEntity<CustomExceptionResponse> handleResourceNotFound(Exception ex) {
        CustomExceptionResponse customExceptionResponse = CustomExceptionResponse.builder()
                .title(RESOURCE_CONSTRAINT_VIOLATION)
                .description(ex.getMessage())
                .build();
        return new ResponseEntity<>(customExceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}