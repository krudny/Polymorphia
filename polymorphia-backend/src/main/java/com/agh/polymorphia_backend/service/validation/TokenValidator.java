package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.model.token.Token;
import com.agh.polymorphia_backend.model.token.TokenType;
import com.agh.polymorphia_backend.repository.invitation.TokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;

@Service
@AllArgsConstructor
public class TokenValidator {
    public static final String TOKEN_NOT_EXPIRED = "Aktywny token już istnieje dla tego adresu email.";
    public static final String TOKEN_EXPIRED = "Token wygasł.";
    public static final String TOKEN_NOT_FOUND = "Token nie został znaleziony.";

    private final TokenRepository tokenRepository;

    public void isTokenAssigned(String email, TokenType expectedType) {
        tokenRepository.findByEmail(email)
                .ifPresent(token -> {
                    if (token.getExpiryDate().isAfter(ZonedDateTime.now())) {
                        throw new ResponseStatusException(HttpStatus.CONFLICT, TOKEN_NOT_EXPIRED);
                    }
                    if (!isTokenTypeValid(token, expectedType)) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, TOKEN_NOT_FOUND);
                    }
                });
    }

    public void validateTokenBeforeUse(Token token, TokenType expectedType) {
        if (isTokenExpired(token)) {
            throw new ResponseStatusException(HttpStatus.GONE, TOKEN_EXPIRED);
        }
        if (!isTokenTypeValid(token, expectedType)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, TOKEN_NOT_FOUND);
        }
    }

    public boolean isTokenExpired(Token token) {
        return token.getExpiryDate().isBefore(ZonedDateTime.now());
    }

    public boolean isTokenTypeValid(Token token, TokenType expectedType) {
        return token.getTokenType() == expectedType;
    }
}
