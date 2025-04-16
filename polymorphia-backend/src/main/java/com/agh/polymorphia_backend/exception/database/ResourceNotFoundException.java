package com.agh.polymorphia_backend.exception.database;

public class ResourceNotFoundException extends GeneralException {
    private static final String DEFAULT_MESSAGE = "Resource not found";
    private static final String EXCEPTION_TITLE = "Database resource not found";

    public ResourceNotFoundException(String message) {
        super(message.isEmpty() ? DEFAULT_MESSAGE : message);
    }

    @Override
    public String getTitle() {
        return EXCEPTION_TITLE;
    }
}
