package com.agh.polymorphia_backend.exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.io.IOException;

@ControllerAdvice
@Order(3)
public class GeneralExceptionHandler {
    private static final String INVALID_PARAMS = "Invalid request parameter type";
    private static final String MISSING_PARAMS = "Missing request parameter";
    private static final String INTERNAL_ERROR = "Internal server error";

    @ExceptionHandler({MethodArgumentTypeMismatchException.class, ConstraintViolationException.class})
    public ResponseEntity<CustomExceptionResponse> handleArgumentNotValidException(Exception ex) {
        CustomExceptionResponse response = CustomExceptionResponse.builder()
                .title(INVALID_PARAMS)
                .description(ex.getMessage())
                .build();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<CustomExceptionResponse> handleMissingServletRequestParameterException(MissingServletRequestParameterException ex) {

        CustomExceptionResponse response = CustomExceptionResponse.builder()
                .title(MISSING_PARAMS)
                .description(String.format("Missing required parameter '%s'", ex.getParameterName()))
                .build();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<CustomExceptionResponse> handleIOException() {
        CustomExceptionResponse response = CustomExceptionResponse.builder()
                .title(INTERNAL_ERROR)
                .description("An internal server error has occurred")
                .build();
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
