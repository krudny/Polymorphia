package com.agh.polymorphia_backend.exception;

import com.fasterxml.jackson.databind.exc.InvalidTypeIdException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
@Order(2)
public class GeneralExceptionHandler {
    private static final String INVALID_PARAMS = "Invalid request parameter type";
    private static final String MISSING_PARAMS = "Missing request parameter";

    @ExceptionHandler({MethodArgumentTypeMismatchException.class, ConstraintViolationException.class})
    public ResponseEntity<CustomExceptionResponse> handleArgumentNotValidException(Exception ex) {
        CustomExceptionResponse response = CustomExceptionResponse.builder()
                .title(INVALID_PARAMS)
                .description(ex.getMessage())
                .build();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidTypeIdException.class)
    public ResponseEntity<CustomExceptionResponse> handleInvalidSubtype(InvalidTypeIdException ex) {
        CustomExceptionResponse customExceptionResponse = CustomExceptionResponse.builder()
                .title(INVALID_PARAMS)
                .description(ex.getMessage())
                .build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(customExceptionResponse);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<CustomExceptionResponse> handleMissingServletRequestParameterException(MissingServletRequestParameterException ex) {

        CustomExceptionResponse response = CustomExceptionResponse.builder()
                .title(MISSING_PARAMS)
                .description(String.format("Missing required parameter '%s'", ex.getParameterName()))
                .build();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationExceptionResponse> handleValidationErrors(MethodArgumentNotValidException ex) {
        List<ValidationError> validationErrors = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(error -> ValidationError.builder()
                        .field(error.getField())
                        .message(error.getDefaultMessage())
                        .build())
                .collect(Collectors.toList());

        ValidationExceptionResponse response = new ValidationExceptionResponse(
                "Validation failed",
                validationErrors
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

}
