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
    public static final String TOKEN_NOT_EXPIRED = "Active token already exists for this email";
    public static final String TOKEN_EXPIRED = "Token has expired";
    public static final String INVALID_TOKEN_TYPE = "Invalid token type";

    private final TokenRepository tokenRepository;

    public void isTokenAssigned(String email, TokenType expectedType) {
        tokenRepository.findByEmail(email)
                .ifPresent(token -> {
                    if (token.getExpiryDate().isAfter(ZonedDateTime.now())) {
                        throw new ResponseStatusException(HttpStatus.CONFLICT, TOKEN_NOT_EXPIRED);
                    }
                });
    }

    public void validateTokenBeforeUse(Token token, TokenType expectedType) {
        if (isTokenExpired(token)) {
            throw new ResponseStatusException(HttpStatus.GONE, TOKEN_EXPIRED);
        }

        if (token.getTokenType() != expectedType) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, INVALID_TOKEN_TYPE);
        }
    }

    public boolean isTokenExpired(Token token) {
        return token.getExpiryDate().isBefore(ZonedDateTime.now());
    }
}
