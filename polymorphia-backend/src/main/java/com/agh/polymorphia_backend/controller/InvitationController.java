package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.user.InvitationRequestDTO;
import com.agh.polymorphia_backend.service.invitation.InvitationService;
import com.agh.polymorphia_backend.service.user.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/invitation")
@AllArgsConstructor
public class InvitationController {
    private final InvitationService invitationService;

    @PostMapping("/invite-user")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<Void> inviteUser(@Valid @RequestBody InvitationRequestDTO inviteDTO) {
        System.out.println(inviteDTO.getIndexNumber());
        invitationService.inviteUser(inviteDTO);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
