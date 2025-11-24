package com.agh.polymorphia_backend.validation.constraint;

import com.agh.polymorphia_backend.validation.validator.ProjectGradableEventValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ProjectGradableEventValidator.class)
public @interface ProjectGradableEventOnly {
    String message() default "Wydarzenie musi być częścią sekcji projektowej.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
