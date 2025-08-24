package com.agh.polymorphia_backend.exception;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.core.annotation.Order;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

@ControllerAdvice
@Order(1)
public class DatabaseExceptionHandler {
    private static final String RESOURCE_CONSTRAINT_VIOLATION = "ResourceConstraintViolationException: %s";

    @ExceptionHandler(DataAccessException.class)
    public void handleResourceNotFound(DataAccessException ex) {
        ex.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }

    @ExceptionHandler({DataIntegrityViolationException.class, ConstraintViolationException.class})
    public void handleResourceNotFound(Exception ex) {
        throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                String.format(RESOURCE_CONSTRAINT_VIOLATION, ex.getMessage())
        );
    }
}