package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.student.CreateAnimalRequestDto;
import com.agh.polymorphia_backend.dto.response.profile.BaseProfileResponseDto;
import com.agh.polymorphia_backend.dto.response.user.StudentActivityResponseDto;
import com.agh.polymorphia_backend.model.course.StudentCourseGroupAssignmentId;
import com.agh.polymorphia_backend.service.student.AnimalService;
import com.agh.polymorphia_backend.service.student.ProfileService;
import com.agh.polymorphia_backend.service.student.StudentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/students")
public class StudentController {
    private final ProfileService profileService;
    private final AnimalService animalService;
    private final StudentService studentService;

    @GetMapping("/profile")
    @PreAuthorize("hasAnyAuthority('STUDENT')")
    public ResponseEntity<BaseProfileResponseDto> getProfile(@RequestParam Long courseId) {
        return ResponseEntity.ok(profileService.getProfile(courseId, Optional.empty()));
    }

    @GetMapping("/{studentId}/profile")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<BaseProfileResponseDto> getStudentProfile(@RequestParam Long courseId, @PathVariable("studentId") Long studentId) {
        return ResponseEntity.ok(profileService.getProfile(courseId, Optional.of(studentId)));
    }

    @GetMapping("/{studentId}/activity")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<StudentActivityResponseDto>> getStudentActivity(@PathVariable Long studentId, @RequestParam Long courseId) {
        return ResponseEntity.ok(studentService.getStudentActivity(studentId, courseId));
    }

    @GetMapping("/course-group")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<StudentCourseGroupAssignmentId> getStudentCourseGroupAssignment(@RequestParam Long courseId) {
        return ResponseEntity.ok(studentService.getStudentCourseGroupAssignment(courseId));
    }

    @GetMapping("/animals/is-valid")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Boolean> hasAnimalInCourse(@RequestParam Long courseId) {
        return ResponseEntity.ok(animalService.hasAnimalInCourse(courseId));
    }

    @PostMapping("/animals")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> createAnimal(@RequestBody @Valid CreateAnimalRequestDto requestDTO) {
        animalService.createAnimal(requestDTO);
        return ResponseEntity.noContent().build();
    }
}
