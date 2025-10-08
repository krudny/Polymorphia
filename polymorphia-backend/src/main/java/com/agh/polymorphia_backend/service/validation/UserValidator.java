package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import com.agh.polymorphia_backend.repository.user.role.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
@AllArgsConstructor
public class UserValidator {
    public static final String USER_ALREADY_REGISTERED = "User has already been registered";
    public static final String USER_ALREADY_EXISTS = "User already exists";

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;

    public void validateUserNotExistsByEmail(String email) {
        userRepository.findByEmail(email)
                .ifPresent(user -> {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, USER_ALREADY_EXISTS);
                });
    }

    public void validateUserNotExistsByIndexNumber(Integer indexNumber) {
        studentRepository.findByIndexNumber(indexNumber)
                .ifPresent(user -> {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, USER_ALREADY_EXISTS);
                });
    }

    public void validateUserRegistered(User user) {
        if (user.getPassword() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, USER_ALREADY_REGISTERED);
        }
    }
}
