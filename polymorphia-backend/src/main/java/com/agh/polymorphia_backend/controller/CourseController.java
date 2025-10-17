package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.user_context.AvailableCoursesResponseDto;
import com.agh.polymorphia_backend.service.course.CourseService;
import com.agh.polymorphia_backend.service.user.UserContextService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/courses")
public class CourseController {
    private final CourseService courseService;

    @GetMapping()
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<AvailableCoursesResponseDto>> getAvailableCourses() {
        return ResponseEntity.ok(courseService.getAvailableCourses());
    }
}
