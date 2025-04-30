package com.agh.polymorphia_backend.exception.database;

public class GeneralException extends RuntimeException {
    public GeneralException(String message) {
        super(message);
    }

    public String getTitle() {
        return "General Error";
    }
}
