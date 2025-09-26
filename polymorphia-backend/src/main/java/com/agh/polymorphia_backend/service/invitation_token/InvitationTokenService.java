package com.agh.polymorphia_backend.service.invitation_token;

import com.agh.polymorphia_backend.dto.request.user.StudentInvitationRequestDTO;
import com.agh.polymorphia_backend.model.user.InvitationToken;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class InvitationTokenService {
    public InvitationToken createInvitationToken(StudentInvitationRequestDTO inviteDTO) {
        String tokenValue = UUID.randomUUID().toString();

        return InvitationToken.builder()
                .email(inviteDTO.getEmail())
                .firstName(inviteDTO.getFirstName())
                .lastName(inviteDTO.getLastName())
                .indexNumber(inviteDTO.getIndexNumber())
                .token(tokenValue)
                .used(false)
                .build();
    }
}
