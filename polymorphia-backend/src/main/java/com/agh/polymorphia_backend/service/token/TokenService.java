package com.agh.polymorphia_backend.service.token;

import com.agh.polymorphia_backend.model.invitation.Token;
import com.agh.polymorphia_backend.repository.invitation.TokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class TokenService {
    private final TokenRepository tokenRepository;

    public Token createToken(String email) {
        String tokenValue = UUID.randomUUID().toString();

        return Token.builder()
                .email(email)
                .token(tokenValue)
                .used(false)
                .build();
    }

    public Token createAndSaveToken(String email) {
            Token token = createToken(email);
            return tokenRepository.save(token);
    }
}
