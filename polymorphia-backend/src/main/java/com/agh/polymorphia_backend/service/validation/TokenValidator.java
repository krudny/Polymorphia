package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.model.Token.Token;
import com.agh.polymorphia_backend.repository.invitation.TokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;

@Service
@AllArgsConstructor
public class TokenValidator {
    public static final String TOKEN_NOT_EXPIRED = "Active invitation token already exists for this email";
    public static final String TOKEN_EXPIRED = "Invitation token has expired";

    private final TokenRepository tokenRepository;

    public void isTokenAssigned(String email) {
        tokenRepository.findByEmail(email)
                .ifPresent(token -> {
                    if (token.getExpiryDate().isAfter(ZonedDateTime.now())) {
                        throw new ResponseStatusException(HttpStatus.CONFLICT, TOKEN_NOT_EXPIRED);
                    }
                });
    }

    public void validateTokenBeforeRegister(Token token) {
        if (isTokenExpired(token)) {
            throw new ResponseStatusException(HttpStatus.GONE, TOKEN_EXPIRED);
        }
    }

    public boolean isTokenExpired(Token token) {
        return token.getExpiryDate().isBefore(ZonedDateTime.now());
    }
}

