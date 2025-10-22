package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.user.ChangePasswordRequestDTO;
import com.agh.polymorphia_backend.dto.response.user_context.UserDetailsResponseDto;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.service.user.UserContextService;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    private final UserContextService userContextService;
    private final UserService userService;

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

    @PostMapping("/change-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> changePassword(@RequestBody ChangePasswordRequestDTO requestDTO) {
        userService.changePassword(requestDTO);
        return ResponseEntity.ok().build();
    }

}
