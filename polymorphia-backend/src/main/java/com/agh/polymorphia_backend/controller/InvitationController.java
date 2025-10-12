package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.csv.process.StudentCourseInvitationRequestDto;
import com.agh.polymorphia_backend.dto.request.csv.process.StudentGroupInvitationRequestDto;
import com.agh.polymorphia_backend.dto.request.user.CourseInvitationRequestDto;
import com.agh.polymorphia_backend.dto.request.user.RegisterRequestDto;
import com.agh.polymorphia_backend.service.csv.processors.StudentCourseInvitationCSVProcessor;
import com.agh.polymorphia_backend.service.csv.processors.StudentGroupInvitationCSVProcessor;
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
    private final StudentCourseInvitationCSVProcessor studentCourseInvitationCSVProcessor;
    private final StudentGroupInvitationCSVProcessor studentGroupInvitationCSVProcessor;

    @PostMapping("/invite-user")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<Void> inviteUser(@Valid @RequestBody CourseInvitationRequestDto inviteDTO) {
        invitationService.inviteUserToCourse(inviteDTO);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/register-user")
    public ResponseEntity<Void> registerStudent(@Valid @RequestBody RegisterRequestDto registerDTO) {
        invitationService.registerUser(registerDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/course/csv")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<Void> processStudentCourseInviteCSV(@RequestBody StudentCourseInvitationRequestDto requestDTO) {
        studentCourseInvitationCSVProcessor.process(requestDTO);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/group/csv")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<Void> processStudentGroupInviteCSV(@RequestBody StudentGroupInvitationRequestDto requestDTO) {
        System.out.println("doszedl");
        studentGroupInvitationCSVProcessor.process(requestDTO);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
