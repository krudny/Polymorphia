package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.csv.StudentInvitationCSVProcessRequestDto;
import com.agh.polymorphia_backend.dto.request.user.InvitationRequestDTO;
import com.agh.polymorphia_backend.dto.request.user.RegisterRequestDTO;
import com.agh.polymorphia_backend.service.csv.processors.StudentInvitationCSVProcessor;
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
    private final StudentInvitationCSVProcessor studentInvitationCSVProcessor;

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

    @PostMapping("/csv")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<Void> processStudentInviteCSV(@RequestBody StudentInvitationCSVProcessRequestDto requestDTO) {
        studentInvitationCSVProcessor.process(requestDTO);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
