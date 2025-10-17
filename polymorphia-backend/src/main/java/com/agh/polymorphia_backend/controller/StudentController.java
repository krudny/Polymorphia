package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.student.CreateAnimalRequestDto;
import com.agh.polymorphia_backend.dto.response.profile.ProfileResponseDto;
import com.agh.polymorphia_backend.model.course.StudentCourseGroupAssignmentId;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.user.UserCourseRoleRepository;
import com.agh.polymorphia_backend.service.student.AnimalService;
import com.agh.polymorphia_backend.service.student.ProfileService;
import com.agh.polymorphia_backend.service.student.StudentService;
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
    private final StudentService studentService;

    @GetMapping("/profile")
    @PreAuthorize("hasAnyAuthority('STUDENT')")
    public ResponseEntity<ProfileResponseDto> getProfile(@RequestParam Long courseId) {
        return ResponseEntity.ok(profileService.getProfile(courseId));
    }

    @GetMapping("/course-group")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<StudentCourseGroupAssignmentId> getStudentCourseGroupAssignment(@RequestParam Long courseId) {
        return ResponseEntity.ok(studentService.getStudentCourseGroupAssignment(courseId));
    }

    @GetMapping("/animal/is-valid")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Boolean> hasAnimalInGroup(@RequestParam Long courseId) {
        return ResponseEntity.ok(animalService.hasAnimalInGroup(courseId));
    }

    @PostMapping("/animal")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> createAnimal(@RequestBody @Valid CreateAnimalRequestDto requestDTO) {
        animalService.createAnimal(requestDTO);
        return ResponseEntity.ok().build();
    }
}
