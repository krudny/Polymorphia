package com.agh.polymorphia_backend.controller;


import com.agh.polymorphia_backend.service.target_list.TargetListService;
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
@RequestMapping("/target-lists")
public class TargetListController {

    private final TargetListService targetListService;

    @GetMapping(value = "/course-group")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<?> getTargetListForCourseGroup() {
        return ResponseEntity.ok(null);
    }

    @GetMapping(value = "/grading")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<?> getTargetListForGrading() {
        return ResponseEntity.ok(null);
    }

    @GetMapping(value = "/grading/groups")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<String>> getGroupsForGradingTargetListFilters(@RequestParam Long gradableEventId) {
        return ResponseEntity.ok(targetListService.getGroupsForGradingTargetListFilters(gradableEventId));
    }
}
