package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.repository.user.StudentRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
@AllArgsConstructor
public class UserValidator {
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;

    public void validateUserNotExistsByEmail(String email) {
        userRepository.findByEmail(email)
                .ifPresent(user -> {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
                });
    }

    public void validateUserNotExistsByIndexNumber(Integer indexNumber) {
        studentRepository.findByIndexNumber(indexNumber)
                .ifPresent(user -> {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
                });
    }
}
