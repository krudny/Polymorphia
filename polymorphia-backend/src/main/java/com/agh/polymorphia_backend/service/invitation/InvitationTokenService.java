package com.agh.polymorphia_backend.service.invitation;

import com.agh.polymorphia_backend.dto.request.user.InvitationRequestDTO;
import com.agh.polymorphia_backend.model.invitation.InvitationToken;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class InvitationTokenService {
    public InvitationToken createInvitationToken(InvitationRequestDTO inviteDTO) {
        String tokenValue = UUID.randomUUID().toString();

        return InvitationToken.builder()
                .email(inviteDTO.getEmail())
                .token(tokenValue)
                .used(false)
                .build();
    }
}
