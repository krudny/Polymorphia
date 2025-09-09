package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.profile.ProfileResponseDto;
import com.agh.polymorphia_backend.service.course.ProfileService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/profile")
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping()
    @PreAuthorize("hasAnyAuthority('STUDENT')")
    public ResponseEntity<ProfileResponseDto> getProfile(@RequestParam Long courseId) {
        return ResponseEntity.ok(profileService.getProfile(courseId));
    }
}
