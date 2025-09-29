package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.csv.StudentInvitationCSVProcessRequestDto;
import com.agh.polymorphia_backend.dto.request.user.StudentInvitationRequestDTO;
import com.agh.polymorphia_backend.dto.request.user.StudentRegisterRequestDTO;
import com.agh.polymorphia_backend.dto.response.user_context.UserDetailsResponseDto;
import com.agh.polymorphia_backend.model.user.*;
import com.agh.polymorphia_backend.service.csv.processors.StudentInvitationCSVProcessor;
import com.agh.polymorphia_backend.service.user.UserContextService;
import com.agh.polymorphia_backend.service.user.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    private final UserContextService userContextService;
    private final UserService userService;
    private final StudentInvitationCSVProcessor studentInvitationCSVProcessor;


    @PostMapping("/preferred-course")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> setPreferredCourse(@RequestParam Long courseId) {
        userContextService.setPreferredCourseId(courseId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/context")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<UserDetailsResponseDto> getUserContext() {
        userContextService.setPreferredCourseIfOneAvailable();
        return ResponseEntity.ok(userContextService.getUserContext());
    }

    @GetMapping("/role")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserType> getUserRole() {
        userContextService.setPreferredCourseIfOneAvailable();
        return ResponseEntity.ok(userContextService.getUserRole());
    }

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
