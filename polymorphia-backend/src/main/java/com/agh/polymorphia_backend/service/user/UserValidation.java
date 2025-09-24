package com.agh.polymorphia_backend.service.user;

import com.agh.polymorphia_backend.model.user.InvitationToken;
import com.agh.polymorphia_backend.repository.user.InvitationTokenRepository;
import com.agh.polymorphia_backend.repository.user.StudentRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Component
@AllArgsConstructor
public class UserValidation {
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final InvitationTokenRepository invitationTokenRepository;

    protected void validateUserNotExists(String email) {
        userRepository.findByEmail(email)
                .ifPresent(user -> {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
                });
    }

    protected void validateBeforeInvitation(String email, Integer indexNumber) {
        studentRepository.findByIndexNumber(indexNumber)
                .ifPresent(user -> {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
                });

        invitationTokenRepository.findByEmail(email)
                .ifPresent(token -> {
                    if (token.getExpiryDate().isAfter(LocalDateTime.now())) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Existing token has not expired");
                    }

                    if (token.isUsed()) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token has already been used");
                    }
                });

        validateUserNotExists(email);
    }

    protected void validateBeforeRegister(InvitationToken token) {
        if (token.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token was expired");
        }

        if (token.isUsed()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token is used");
        }

        validateUserNotExists(token.getEmail());
    }
}
