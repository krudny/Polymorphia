package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.criteria.CriterionResponseDto;
import com.agh.polymorphia_backend.service.criteria.CriteriaService;
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
@RequestMapping("/criteria")
public class CriteriaController {
    private final CriteriaService criteriaService;

    @GetMapping()
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<CriterionResponseDto>> getGradableEventCriteria(@RequestParam Long gradableEventId) {
        return ResponseEntity.ok(criteriaService.getCriteria(gradableEventId));
    }
}
