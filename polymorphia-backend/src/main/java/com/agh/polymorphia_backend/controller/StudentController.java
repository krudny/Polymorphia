package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.student.CreateAnimalRequestDTO;
import com.agh.polymorphia_backend.dto.response.profile.ProfileResponseDto;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.service.student.AnimalService;
import com.agh.polymorphia_backend.service.student.ProfileService;
import com.agh.polymorphia_backend.service.user.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/students")
public class StudentController {
    private final ProfileService profileService;
    private final AnimalService animalService;
    private final UserService userService;

    @GetMapping("/profile")
    @PreAuthorize("hasAnyAuthority('STUDENT')")
    public ResponseEntity<ProfileResponseDto> getProfile(@RequestParam Long courseId) {
        return ResponseEntity.ok(profileService.getProfile(courseId));
    }

    @GetMapping("/animal")
    public ResponseEntity<Boolean> getAnimal(@RequestParam Long courseId) {
        User user = userService.getCurrentUser().getUser();
        return ResponseEntity.ok(animalService.isAnimalValid(user.getId(), courseId));
    }

    @PostMapping("/animal")
    public ResponseEntity<Void> createAnimal(@RequestBody @Valid CreateAnimalRequestDTO requestDTO) {
        animalService.createAnimal(requestDTO);
        return ResponseEntity.ok().build();
    }
}
