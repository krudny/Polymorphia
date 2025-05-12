package com.agh.polymorphia_backend.exception;

import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Order(2)
public class ValidationExceptionHandler {
    @ExceptionHandler({ValidationException.class})
    public ResponseEntity<ValidationExceptionResponse> handleArgumentNotValidException(ValidationException ex) {
        return new ResponseEntity<>(ex.getValidationExceptionResponse(), HttpStatus.BAD_REQUEST);
    }

}
