package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.grade.ShortGradeRequestDto;
import com.agh.polymorphia_backend.dto.response.event.BaseGradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.grade.ShortGradeResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.points_summary.PointsSummaryResponseDto;
import com.agh.polymorphia_backend.service.gradable_event.GradableEventService;
import com.agh.polymorphia_backend.service.gradable_event.PointsSummaryService;
import com.agh.polymorphia_backend.service.gradable_event.ShortGradeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping("/gradable-events")
public class GradableEventController {
    private final GradableEventService gradableEventService;
    private final PointsSummaryService pointsSummaryService;
    private final ShortGradeService shortGradeService;

    @GetMapping()
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<BaseGradableEventResponseDto>> getGradableEvents(@RequestParam Long eventSectionId) {
        return ResponseEntity.ok(gradableEventService.getGradableEvents(eventSectionId));
    }

    @GetMapping("/points-summary")
    @PreAuthorize("hasAnyAuthority('STUDENT')")
    public ResponseEntity<PointsSummaryResponseDto> getPointsSummary(@RequestParam Long eventSectionId) {
        return ResponseEntity.ok(pointsSummaryService.getPointsSummary(eventSectionId));
    }

    @PostMapping("/short-grade")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ShortGradeResponseDto> getShortGrade(@RequestParam Long gradableEventId, @RequestBody ShortGradeRequestDto requestDto) {
        return ResponseEntity.ok(shortGradeService.getShortGrade(gradableEventId, requestDto.getTarget()));
    }
}
