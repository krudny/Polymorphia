package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.grade.ShortGradeRequestDto;
import com.agh.polymorphia_backend.dto.response.criteria.CriterionResponseDto;
import com.agh.polymorphia_backend.dto.response.event.BaseGradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.grade.ShortGradeResponseDtoWithType;
import com.agh.polymorphia_backend.dto.response.reward.points_summary.PointsSummaryResponseDto;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
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
        return ResponseEntity.ok(gradableEventService.getGradableEvents(eventSectionId, GradableEvent::getOrderIndex));
    }

    @GetMapping("/points-summary")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<PointsSummaryResponseDto> getPointsSummary(@RequestParam Long eventSectionId) {
        return ResponseEntity.ok(pointsSummaryService.getPointsSummary(eventSectionId));
    }

    @PostMapping("/short-grade")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<ShortGradeResponseDtoWithType> getShortGrade(@RequestParam Long gradableEventId, @RequestBody ShortGradeRequestDto requestDto) {
        return ResponseEntity.ok(shortGradeService.getShortGrade(gradableEventId, requestDto.getTarget()));
    }

    @GetMapping("/criteria")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<CriterionResponseDto>> getGradableEventCriteria(@RequestParam Long gradableEventId) {
        return ResponseEntity.ok(gradableEventService.getCriteria(gradableEventId));
    }
}
