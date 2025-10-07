package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.model.invitation.InvitationToken;
import com.agh.polymorphia_backend.repository.invitation.InvitationTokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;

@Component
@AllArgsConstructor
public class InvitationTokenValidator {
    public static final String TOKEN_NOT_EXPIRED = "Active invitation token already exists for this email";
    public static final String TOKEN_ALREADY_USED = "Invitation token has already been used";
    public static final String TOKEN_EXPIRED = "Invitation token has expired";

    private final InvitationTokenRepository invitationTokenRepository;

    public void validateTokenBeforeInvitation(String email) {
        invitationTokenRepository.findByEmail(email)
                .ifPresent(token -> {
                    if (token.getExpiryDate().isAfter(ZonedDateTime.now())) {
                        throw new ResponseStatusException(HttpStatus.CONFLICT, TOKEN_NOT_EXPIRED);
                    }

                    if (token.isUsed()) {
                        throw new ResponseStatusException(HttpStatus.CONFLICT, TOKEN_ALREADY_USED);
                    }
                });
    }

    public void validateTokenBeforeRegister(InvitationToken token) {
        if (token.getExpiryDate().isBefore(ZonedDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.GONE, TOKEN_EXPIRED);
        }

        if (token.isUsed()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, TOKEN_ALREADY_USED);
        }
    }
}

