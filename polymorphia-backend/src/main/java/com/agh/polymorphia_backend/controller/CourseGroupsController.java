package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.course_groups.CourseGroupsResponseDto;
import com.agh.polymorphia_backend.dto.response.course_groups.CourseGroupsShortResponseDto;
import com.agh.polymorphia_backend.service.course_groups.CourseGroupsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/course-groups")
public class CourseGroupsController {
    private final CourseGroupsService courseGroupService;

    @GetMapping(value = "/all")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CourseGroupsResponseDto>> getAllCourseGroups(@RequestParam Long courseId) {
        return ResponseEntity.ok(courseGroupService.getAllCourseGroups(courseId));
    }

    @GetMapping(value = "/all/short")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CourseGroupsShortResponseDto>> getAllShortCourseGroups(@RequestParam Long courseId) {
        return ResponseEntity.ok(courseGroupService.getAllShortCourseGroups(courseId));
    }

    @GetMapping(value = "/individual")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CourseGroupsResponseDto>> getIndividualCourseGroups(@RequestParam Long courseId) {
        return ResponseEntity.ok(courseGroupService.getIndividualCourseGroups(courseId));
    }

    @GetMapping(value = "/individual/short")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CourseGroupsShortResponseDto>> getIndividualShortCourseGroups(@RequestParam Long courseId) {
        return ResponseEntity.ok(courseGroupService.getIndividualShortCourseGroups(courseId));
    }
}
