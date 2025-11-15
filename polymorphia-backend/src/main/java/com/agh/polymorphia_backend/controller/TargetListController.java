package com.agh.polymorphia_backend.controller;


import com.agh.polymorphia_backend.dto.request.target_list.CourseGroupsTargetListRequestDto;
import com.agh.polymorphia_backend.dto.request.target_list.GradingTargetListRequestDto;
import com.agh.polymorphia_backend.dto.response.target_list.StudentTargetResponseDto;
import com.agh.polymorphia_backend.dto.response.target_list.TargetResponseDto;
import com.agh.polymorphia_backend.service.target_list.TargetListService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/target-lists")
public class TargetListController {

    private final TargetListService targetListService;

    @PostMapping(value = "/course-group")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<StudentTargetResponseDto>> getTargetListForCourseGroup(@Valid @RequestBody CourseGroupsTargetListRequestDto requestDto) {
        return ResponseEntity.ok(targetListService.getTargetListForCourseGroup(requestDto));
    }

    @PostMapping(value = "/grading")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<TargetResponseDto>> getTargetListForGrading(@Valid @RequestBody GradingTargetListRequestDto requestDto) {
        return ResponseEntity.ok(null);
    }

    @GetMapping(value = "/grading/groups")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<String>> getGroupsForGradingTargetListFilters(@RequestParam Long gradableEventId) {
        return ResponseEntity.ok(targetListService.getGroupsForGradingTargetListFilters(gradableEventId));
    }
}
