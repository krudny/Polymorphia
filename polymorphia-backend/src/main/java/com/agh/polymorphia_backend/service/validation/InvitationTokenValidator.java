package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.model.invitation.InvitationToken;
import com.agh.polymorphia_backend.repository.invitation.InvitationTokenRepository;
import com.agh.polymorphia_backend.repository.user.role.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;

@Component
@AllArgsConstructor
public class InvitationTokenValidator {
    private final StudentRepository studentRepository;
    private final InvitationTokenRepository invitationTokenRepository;
    private final UserValidator userValidator;

    public void validateBeforeInvitation(String email, Integer indexNumber) {
        userValidator.validateUserNotExistsByIndexNumber(indexNumber);

        invitationTokenRepository.findByEmail(email)
                .ifPresent(token -> {
                    if (token.getExpiryDate().isAfter(ZonedDateTime.now())) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Existing token has not expired");
                    }

                    if (token.isUsed()) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token has already been used");
                    }
                });

        userValidator.validateUserNotExistsByEmail(email);
    }

    public void validateBeforeRegister(InvitationToken token) {
        if (token.getExpiryDate().isBefore(ZonedDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token has expired");
        }

        if (token.isUsed()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token has already been used");
        }

        userValidator.validateUserNotExistsByEmail(token.getEmail());
    }
}
