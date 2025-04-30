package com.agh.polymorphia_backend.exception.database;

public class InvalidArgumentException extends GeneralException {
    private static final String DEFAULT_MESSAGE = "Resource not found";
    private static final String EXCEPTION_TITLE = "Database resource not found";

    public InvalidArgumentException(String message) {
        super(message.isEmpty() ? DEFAULT_MESSAGE : message);
    }

    @Override
    public String getTitle() {
        return EXCEPTION_TITLE;
    }
}
