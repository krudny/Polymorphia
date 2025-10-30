package com.agh.polymorphia_backend.service.submission;

import com.agh.polymorphia_backend.dto.request.target.StudentGroupTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.StudentTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.TargetRequestDto;
import com.agh.polymorphia_backend.dto.response.submission.SubmissionDetailsDto;
import com.agh.polymorphia_backend.dto.response.submission.SubmissionRequirementResponseDto;
import com.agh.polymorphia_backend.model.event_section.EventSectionType;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.submission.SubmissionRequirement;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.repository.submission.SubmissionRequirementRepository;
import com.agh.polymorphia_backend.service.gradable_event.GradableEventService;
import com.agh.polymorphia_backend.service.mapper.SubmissionMapper;
import com.agh.polymorphia_backend.service.user.UserService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class SubmissionService {
    private static final String SUBMISSION_TEST_SECTIONS_NOT_SUPPORTED = "Submissions for test event sections is not supported";
    private static final String STUDENT_NOT_FOUND = "Student not found";

    private final GradableEventService gradableEventService;
    private final AccessAuthorizer accessAuthorizer;
    private final SubmissionRequirementRepository submissionRequirementRepository;
    private final SubmissionMapper submissionMapper;
    private final UserService userService;

    public List<SubmissionRequirementResponseDto> getSubmissionRequirements(Long gradableEventId) {
        GradableEvent gradableEvent = getGradableEventIfNotTest(gradableEventId);
        accessAuthorizer.authorizeCourseAccess(gradableEvent.getEventSection().getCourse().getId());

        return submissionRequirementRepository
                .getSubmissionRequirementsByGradableEvent(gradableEvent)
                .stream()
                .sorted(Comparator.comparing(SubmissionRequirement::getOrderIndex))
                .map(submissionMapper::toSubmissionRequirementResponseDto)
                .toList();
    }

    public Map<Long, SubmissionDetailsDto> getSubmissionDetails(Long gradableEventId, TargetRequestDto target) {
        GradableEvent gradableEvent = getGradableEventIfNotTest(gradableEventId);
        accessAuthorizer.authorizeCourseAccess(gradableEvent.getEventSection().getCourse().getId());

        // if student, target must be the student themselves or group they belong to
        // if instructor, target must belong to their course group
        // if coordinator, course access is enough
    }

    private boolean authorizeTargetAccess(TargetRequestDto target) {
        return switch (userService.getCurrentUserRole()) {
            case STUDENT -> authorizeTargetAccessForStudent(target);
            // TODO
            case INSTRUCTOR -> false;
            case COORDINATOR -> false;
            case UNDEFINED -> false;
        };
    }

    private boolean authorizeTargetAccessForStudent(TargetRequestDto target) {
        switch (target) {
            case StudentTargetRequestDto studentTargetRequestDto -> {
                if (studentTargetRequestDto.id().longValue() != userService.getCurrentUser().getUserId().longValue()) {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_NOT_FOUND);
                }
            }
            case StudentGroupTargetRequestDto studentGroupTargetRequestDto -> {
                // TODO
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return true;
    }

    private GradableEvent getGradableEventIfNotTest(Long gradableEventId) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(gradableEventId);
        if (gradableEvent.getEventSection().getEventSectionType() == EventSectionType.TEST) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, SUBMISSION_TEST_SECTIONS_NOT_SUPPORTED);
        }

        return gradableEvent;
    }
}
