package com.agh.polymorphia_backend.service;

import org.springframework.stereotype.Service;

@Service
public class DbExtractingUtil {
    public static final String DB_OBJECT_NOT_FOUND = "%s of id: %s not found";
    public static final String UNKNOWN_SUBCLASS = "Some objects of type %s exist without a corresponding subtype";
    public static final String FIELD_GRADABLE_EVENT = "GradableEvent";
    public static final String FIELD_EVENT_SECTION = "EventSection";
    public static final String FIELD_ANIMAL = "Animal";
    public static final String FIELD_CHEST = "Chest";
    public static final String FIELD_ITEM = "Item";

}
