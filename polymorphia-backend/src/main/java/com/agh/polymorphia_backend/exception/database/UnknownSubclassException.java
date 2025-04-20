package com.agh.polymorphia_backend.exception.database;

public class UnknownSubclassException extends GeneralException {
    private static final String EXCEPTION_TITLE = "Object of unknown subclass";

    public UnknownSubclassException(String message) {
        super(message);
    }

    @Override
    public String getTitle() {
        return EXCEPTION_TITLE;
    }
}
