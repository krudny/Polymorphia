package com.agh.polymorphia_backend.service.invitation;

import com.agh.polymorphia_backend.dto.request.user.CourseInvitationRequestDto;
import com.agh.polymorphia_backend.model.invitation.Token;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class InvitationTokenService {
    public Token createInvitationToken(CourseInvitationRequestDto inviteDTO) {
        String tokenValue = UUID.randomUUID().toString();

        return Token.builder()
                .email(inviteDTO.getEmail())
                .token(tokenValue)
                .used(false)
                .build();
    }
}
