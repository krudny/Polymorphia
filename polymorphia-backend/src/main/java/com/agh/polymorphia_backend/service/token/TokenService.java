package com.agh.polymorphia_backend.service.token;

import com.agh.polymorphia_backend.model.token.Token;
import com.agh.polymorphia_backend.model.token.TokenType;
import com.agh.polymorphia_backend.repository.invitation.TokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

import static com.agh.polymorphia_backend.service.validation.TokenValidator.TOKEN_NOT_FOUND;

@Service
@AllArgsConstructor
public class TokenService {
    private final TokenRepository tokenRepository;

    public Token createToken(String email, TokenType tokenType) {
        String tokenValue = UUID.randomUUID().toString();

        return Token.builder()
                .email(email)
                .token(tokenValue)
                .tokenType(tokenType)
                .build();
    }

    public Token createAndSaveToken(String email, TokenType tokenType) {
        Token token = createToken(email, tokenType);
        return tokenRepository.save(token);
    }

    public void deleteToken(Token token) {
        tokenRepository.delete(token);
    }

    public Token getTokenFromValue(String tokenValue) {
        return tokenRepository.findByToken(tokenValue)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, TOKEN_NOT_FOUND));
    }
}
