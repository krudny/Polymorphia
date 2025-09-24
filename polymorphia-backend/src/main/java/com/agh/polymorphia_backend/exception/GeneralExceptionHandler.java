package com.agh.polymorphia_backend.exception;

import com.agh.polymorphia_backend.exception.validation.ValidationError;
import com.agh.polymorphia_backend.exception.validation.ValidationExceptionResponse;
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
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
@Order(2)
public class GeneralExceptionHandler {
    private static final String INVALID_PARAMS = "Invalid request parameter type";
    private static final String MISSING_PARAMS = "Missing request parameter: %s";

    @ExceptionHandler({MethodArgumentTypeMismatchException.class, ConstraintViolationException.class, InvalidTypeIdException.class, IllegalArgumentException.class})
    public void handleArgumentNotValidException(Exception ex) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, INVALID_PARAMS, ex);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public void handleMissingServletRequestParameterException(MissingServletRequestParameterException ex) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, String.format(MISSING_PARAMS, ex.getParameterName()), ex);
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
