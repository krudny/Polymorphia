package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.csv.StudentInvitationCSVProcessRequestDto;
import com.agh.polymorphia_backend.dto.request.user.StudentInvitationRequestDTO;
import com.agh.polymorphia_backend.dto.request.user.StudentRegisterRequestDTO;
import com.agh.polymorphia_backend.service.csv.processors.StudentInvitationCSVProcessor;
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
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final StudentInvitationCSVProcessor studentInvitationCSVProcessor;

    @PostMapping("/invite")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<Void> inviteStudent(@Valid @RequestBody StudentInvitationRequestDTO inviteDTO) {
        userService.inviteStudent(inviteDTO);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/invite/csv")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<Void> processStudentInviteCSV(@RequestBody StudentInvitationCSVProcessRequestDto requestDTO) {
        studentInvitationCSVProcessor.process(requestDTO);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/register")
    public ResponseEntity<Void> registerStudent(@Valid @RequestBody StudentRegisterRequestDTO registerDTO) {
        userService.registerStudent(registerDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}

