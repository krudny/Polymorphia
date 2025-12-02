package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.course_group.CreateCourseGroupRequestDto;
import com.agh.polymorphia_backend.dto.response.course_groups.CourseGroupsResponseDto;
import com.agh.polymorphia_backend.dto.response.course_groups.CourseGroupsShortResponseDto;
import com.agh.polymorphia_backend.dto.response.user.TeachingRoleUserResponseDto;
import com.agh.polymorphia_backend.service.course_groups.CourseGroupsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/course-groups")
public class CourseGroupsController {
    private final CourseGroupsService courseGroupService;

    @PostMapping()
    @PreAuthorize("hasAnyAuthority('COORDINATOR')")
    public ResponseEntity<Void> createCourseGroup(@RequestBody CreateCourseGroupRequestDto requestDto) {
        courseGroupService.createCourseGroup(requestDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CourseGroupsResponseDto>> getAllCourseGroups(@RequestParam Long courseId) {
        return ResponseEntity.ok(courseGroupService.getAllCourseGroups(courseId));
    }

    @GetMapping("/all/short")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CourseGroupsShortResponseDto>> getAllShortCourseGroups(@RequestParam Long courseId) {
        return ResponseEntity.ok(courseGroupService.getAllShortCourseGroups(courseId));
    }

    @GetMapping("/individual")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CourseGroupsResponseDto>> getIndividualCourseGroups(@RequestParam Long courseId) {
        return ResponseEntity.ok(courseGroupService.getIndividualCourseGroups(courseId));
    }

    @GetMapping("/individual/short")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CourseGroupsShortResponseDto>> getIndividualShortCourseGroups(@RequestParam Long courseId) {
        return ResponseEntity.ok(courseGroupService.getIndividualShortCourseGroups(courseId));
    }

    @GetMapping("/teaching-role")
    @PreAuthorize("hasAuthority('COORDINATOR')")
    public ResponseEntity<List<TeachingRoleUserResponseDto>> getTeachingRoleUsers(@RequestParam Long courseId) {
        return ResponseEntity.ok(courseGroupService.getTeachingRoleUsers(courseId));
    }

    @DeleteMapping("/{courseGroupId}")
    @PreAuthorize("hasAnyAuthority('COORDINATOR')")
    public ResponseEntity<Void> deleteCourseGroup(@PathVariable Long courseGroupId) {
        courseGroupService.deleteCourseGroup(courseGroupId);
        return ResponseEntity.ok().build();
    }
}
