package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.csv.process.StudentCourseInvitationRequestDto;
import com.agh.polymorphia_backend.dto.request.csv.process.StudentGroupInvitationRequestDto;
import com.agh.polymorphia_backend.dto.request.user.CourseInvitationRequestDto;
import com.agh.polymorphia_backend.dto.request.user.RegisterRequestDto;
import com.agh.polymorphia_backend.service.csv.processors.StudentCourseInvitationCSVProcessor;
import com.agh.polymorphia_backend.service.csv.processors.StudentGroupInvitationCSVProcessor;
import com.agh.polymorphia_backend.service.invitation.InvitationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
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

    @PostMapping("/course")
    @PreAuthorize("hasAnyAuthority('COORDINATOR')")
    public ResponseEntity<Void> inviteUser(@Valid @RequestBody CourseInvitationRequestDto inviteDTO) {
        invitationService.inviteUserToCourse(inviteDTO);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/register-user")
    public ResponseEntity<Void> registerStudent(@Valid @RequestBody RegisterRequestDto registerDTO, HttpServletRequest request) {
        invitationService.registerUser(registerDTO, request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/course/csv")
    @PreAuthorize("hasAnyAuthority('COORDINATOR')")
    public ResponseEntity<Void> processStudentCourseInviteCSV(@RequestBody StudentCourseInvitationRequestDto requestDTO) {
        studentCourseInvitationCSVProcessor.process(requestDTO);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/group/csv")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<Void> processStudentGroupInviteCSV(@RequestBody StudentGroupInvitationRequestDto requestDTO) {
        studentGroupInvitationCSVProcessor.process(requestDTO);
        return ResponseEntity.noContent().build();
    }

}
