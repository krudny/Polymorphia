package com.agh.polymorphia_backend.exception.database;

import com.agh.polymorphia_backend.exception.Problem;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class DatabaseExceptionHandler {
    private static final String DATA_ACCESS_EXCEPTION = "DataAccessException";
    private static final String RESOURCE_CONSTRAINT_VIOLATION = "ResourceConstraintViolationException";

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Problem> handleResourceNotFound(ResourceNotFoundException ex) {
        Problem problem = Problem.builder()
                .title(ex.getTitle())
                .description(ex.getMessage())
                .build();
        return new ResponseEntity<>(problem, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<Problem> handleResourceNotFound(DataAccessException ex) {
        Problem problem = Problem.builder()
                .title(DATA_ACCESS_EXCEPTION)
                .description(ex.getMessage())
                .build();
        return new ResponseEntity<>(problem, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({DataIntegrityViolationException.class, ConstraintViolationException.class})
    public ResponseEntity<Problem> handleResourceNotFound(Exception ex) {
        Problem problem = Problem.builder()
                .title(RESOURCE_CONSTRAINT_VIOLATION)
                .description(ex.getMessage())
                .build();
        return new ResponseEntity<>(problem, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}