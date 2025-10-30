package com.agh.polymorphia_backend.service.submission;

import com.agh.polymorphia_backend.dto.request.target.StudentGroupTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.StudentTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.TargetRequestDto;
import com.agh.polymorphia_backend.dto.response.submission.SubmissionDetailsDto;
import com.agh.polymorphia_backend.dto.response.submission.SubmissionRequirementResponseDto;
import com.agh.polymorphia_backend.model.event_section.EventSectionType;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.project.ProjectGroup;
import com.agh.polymorphia_backend.model.submission.SubmissionRequirement;
import com.agh.polymorphia_backend.repository.submission.SubmissionRequirementRepository;
import com.agh.polymorphia_backend.service.gradable_event.GradableEventService;
import com.agh.polymorphia_backend.service.mapper.SubmissionMapper;
import com.agh.polymorphia_backend.service.project.ProjectGroupService;
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
    private final ProjectGroupService projectGroupService;

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


        // request by student
            // target is student
                // gradable event is assignment     -> studentId must match, get submissions for student
                // gradable event is project        -> studentId must match, get submissions for student
            // target is group
                // gradable event is assignment     -> error
                // gradable event is project        -> student must be in the project group related to this gradable event, get submissions for student

        // request by instructor
            // target is student
                // gradable event is assignment     -> student must be in instructor's course group, get submissions for student
                // gradable event is project        -> student must be in project group that belongs to instructor related to this gradable event, get submissions for student
            // target is group
                // gradable event is assignment     -> error
                // gradable event is project        -> project group must belong to instructor, get submissions for random student in the group

        // request by coordinator
            // target is student
                // gradable event is assignment     -> get submissions for student
                // gradable event is project        -> get submissions for student
            // target is group
                // gradable event is assignment     -> error
                // gradable event is project        -> set submissions for student

        return null;
    }

    private boolean authorizeTargetAccess(TargetRequestDto target) {
        return switch (userService.getCurrentUserRole()) {
            case STUDENT -> authorizeTargetAccessForStudent(target);
            case INSTRUCTOR -> authorizeTargetAccessForInstructor(target);
            case COORDINATOR -> true;
            case UNDEFINED -> false;
        };
    }

    private boolean authorizeTargetAccessForStudent(TargetRequestDto target) {
        switch (target) {
            case StudentTargetRequestDto studentTargetRequestDto -> {
                if (studentTargetRequestDto.id().longValue() != userService.getCurrentUser().getUserId().longValue()) {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_NOT_FOUND);
                }

                return true;
            }
            case StudentGroupTargetRequestDto studentGroupTargetRequestDto -> {
                return projectGroupService.getProjectGroupByIdAndStudentId(
                                studentGroupTargetRequestDto.groupId(),
                                userService.getCurrentUser().getUserId()
                        ) != null;
            }
        }
    }

    private boolean authorizeTargetAccessForInstructor(TargetRequestDto target) {
        switch (target) {
            case StudentTargetRequestDto studentTargetRequestDto -> {

            }
            case StudentGroupTargetRequestDto studentGroupTargetRequestDto -> {
                return projectGroupService.getProjectGroupByIdAndInstructorId(
                        studentGroupTargetRequestDto.groupId(),
                        userService.getCurrentUser().getUserId()
                ) != null;
            }
        }
    }

    private GradableEvent getGradableEventIfNotTest(Long gradableEventId) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(gradableEventId);
        if (gradableEvent.getEventSection().getEventSectionType() == EventSectionType.TEST) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, SUBMISSION_TEST_SECTIONS_NOT_SUPPORTED);
        }

        return gradableEvent;
    }
}
