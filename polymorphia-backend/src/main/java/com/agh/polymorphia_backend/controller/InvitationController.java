package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.user.InvitationRequestDTO;
import com.agh.polymorphia_backend.dto.request.user.RegisterRequestDTO;
import com.agh.polymorphia_backend.service.invitation.InvitationService;
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
        invitationService.inviteUser(inviteDTO);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/register-user")
    public ResponseEntity<Void> registerStudent(@Valid @RequestBody RegisterRequestDTO registerDTO) {
        invitationService.registerUser(registerDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
