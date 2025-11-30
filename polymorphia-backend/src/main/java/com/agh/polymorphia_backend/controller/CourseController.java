package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.course_import.CourseDetailsRequestDto;
import com.agh.polymorphia_backend.dto.response.user_context.AvailableCoursesResponseDto;
import com.agh.polymorphia_backend.service.course.CourseDetailsService;
import com.agh.polymorphia_backend.service.course.CourseService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/courses")
public class CourseController {
    private final CourseService courseService;
    private final CourseDetailsService courseDetailsService;

    @GetMapping()
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<AvailableCoursesResponseDto>> getAvailableCourses() {
        return ResponseEntity.ok(courseService.getAvailableCourses());
    }

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('COORDINATOR')")
    public ResponseEntity<Void> createCourse() {
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/config")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CourseDetailsRequestDto> getCourseConfig(@RequestParam Long courseId) {
        return ResponseEntity.ok(courseDetailsService.getCourseDetails(courseId));
    }
}
