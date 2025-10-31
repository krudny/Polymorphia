package com.agh.polymorphia_backend.service.token;

import com.agh.polymorphia_backend.model.Token.Token;
import com.agh.polymorphia_backend.repository.invitation.TokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
@AllArgsConstructor
public class TokenService {
    public final static String TOKEN_NOT_FOUND = "Token not found";
    public static final String TOKEN_NOT_EXIST = "Token doesn't exist";
    private final TokenRepository tokenRepository;

    public Token createToken(String email) {
        String tokenValue = UUID.randomUUID().toString();

        return Token.builder()
                .email(email)
                .token(tokenValue)
                .build();
    }

    public Token createAndSaveToken(String email) {
            Token token = createToken(email);
            return tokenRepository.save(token);
    }

    public void deleteToken(Token token) {
        tokenRepository.delete(token);
    }

    public Token getTokenFromValue(String tokenValue) {
        return tokenRepository.findByToken(tokenValue)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, TOKEN_NOT_FOUND));
    }

    public Token getTokenFromEmail(String email) {
        return tokenRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, TOKEN_NOT_EXIST));
    }

    public String getEmailFromToken(String tokenValue) {
        return getTokenFromValue(tokenValue).getEmail();
    }
}
