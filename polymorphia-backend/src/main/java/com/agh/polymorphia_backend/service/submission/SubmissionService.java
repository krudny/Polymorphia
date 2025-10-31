package com.agh.polymorphia_backend.service.submission;

import com.agh.polymorphia_backend.dto.request.target.StudentGroupTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.StudentTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.TargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.TargetType;
import com.agh.polymorphia_backend.dto.response.submission.SubmissionDetailsDto;
import com.agh.polymorphia_backend.dto.response.submission.SubmissionRequirementResponseDto;
import com.agh.polymorphia_backend.model.event_section.EventSectionType;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.submission.Submission;
import com.agh.polymorphia_backend.model.submission.SubmissionRequirement;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.repository.project.ProjectGroupRepository;
import com.agh.polymorphia_backend.repository.submission.SubmissionRepository;
import com.agh.polymorphia_backend.repository.submission.SubmissionRequirementRepository;
import com.agh.polymorphia_backend.repository.user.role.StudentRepository;
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
    private static final String STUDENT_GROUP_NOT_FOUND = "Student group not found";
    private static final String INVALID_TARGET = "Group target is supported only for project section";
    private static final String UNSUPPORTED_ROLE = "User must have valid role";

    private final GradableEventService gradableEventService;
    private final AccessAuthorizer accessAuthorizer;
    private final SubmissionRequirementRepository submissionRequirementRepository;
    private final SubmissionMapper submissionMapper;
    private final UserService userService;
    private final SubmissionRepository submissionRepository;
    private final ProjectGroupRepository projectGroupRepository;
    private final StudentRepository studentRepository;

    public List<SubmissionRequirementResponseDto> getSubmissionRequirements(Long gradableEventId) {
        GradableEvent gradableEvent = validateAndGetGradableEvent(gradableEventId);

        return submissionRequirementRepository
                .getSubmissionRequirementsByGradableEvent(gradableEvent)
                .stream()
                .sorted(Comparator.comparing(SubmissionRequirement::getOrderIndex))
                .map(submissionMapper::toSubmissionRequirementResponseDto)
                .toList();
    }

    public Map<Long, SubmissionDetailsDto> getSubmissionDetails(Long gradableEventId, TargetRequestDto target) {
        GradableEvent gradableEvent = validateAndGetGradableEvent(gradableEventId);
        if (target.type() == TargetType.STUDENT_GROUP &&
                gradableEvent.getEventSection().getEventSectionType() != EventSectionType.PROJECT) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, INVALID_TARGET);
        }

        Student submissionSource = getSubmissionSourceForTarget(gradableEvent, target);

        List<Submission> submissions = submissionRepository.getSubmissionsByGradableEventAndStudent(gradableEventId, submissionSource.getUserId());
        List<SubmissionRequirement> submissionRequirements = submissionRequirementRepository.getSubmissionRequirementsByGradableEvent(gradableEvent);

        return submissionMapper.toSubmissionDetailsResponseDto(submissions, submissionRequirements);
    }

    private Student getSubmissionSourceForTarget(GradableEvent gradableEvent, TargetRequestDto target) {
        return switch (userService.getCurrentUserRole()) {
            case STUDENT -> getSubmissionSourceForTargetRequestedByStudent(gradableEvent, target);
            case INSTRUCTOR -> getSubmissionSourceForTargetRequestedByInstructor(gradableEvent, target);
            case COORDINATOR -> getSubmissionSourceForTargetRequestedByCoordinator(gradableEvent, target);
            case UNDEFINED -> throw new ResponseStatusException(HttpStatus.FORBIDDEN, UNSUPPORTED_ROLE);
        };
    }

    private Student getSubmissionSourceForTargetRequestedByStudent(GradableEvent gradableEvent, TargetRequestDto target) {
        // request by student
        //      target is student
        //          gradable event is assignment     -> studentId must match, get submissions for student
        //          gradable event is project        -> studentId must match, get submissions for student
        //      target is group
        //          gradable event is assignment     -> error
        //          gradable event is project        -> student must be in the project group related to this gradable event, get submissions for student
        switch (target) {
            case StudentTargetRequestDto studentTargetRequestDto -> {
                if (userService.getCurrentUser().getUserId() != studentTargetRequestDto.id().longValue()) {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_NOT_FOUND);
                }
            }
            case StudentGroupTargetRequestDto studentGroupTargetRequestDto -> {
                if (projectGroupRepository.getProjectGroupByIdAndStudentIdAndProjectId(
                        studentGroupTargetRequestDto.groupId(),
                        userService.getCurrentUser().getUserId(),
                        gradableEvent.getId()).isEmpty()) {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_GROUP_NOT_FOUND);
                }
            }
        }

        return (Student) userService.getCurrentUser();
    }

    private Student getSubmissionSourceForTargetRequestedByInstructor(GradableEvent gradableEvent, TargetRequestDto target) {
        // request by instructor
        //      target is student
        //          gradable event is assignment     -> student must be in instructor's course group which is in a course with this gradable event, get submissions for student
        //          gradable event is project        -> student must be in project group that belongs to instructor related to this gradable event, get submissions for student
        //      target is group
        //          gradable event is assignment     -> error
        //          gradable event is project        -> project group must belong to instructor, get submissions for random student in the group
        switch (target) {
            case StudentTargetRequestDto studentTargetRequestDto -> {
                return switch (gradableEvent.getEventSection().getEventSectionType()) {
                    case ASSIGNMENT ->
                        studentRepository.findByUserIdAndGradableEventIdAndCourseGroupInstructorId(
                                studentTargetRequestDto.id(),
                                gradableEvent.getId(),
                                userService.getCurrentUser().getUserId()
                        ).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_NOT_FOUND));
                    case PROJECT -> studentRepository.findByUserIdAndProjectIdAndProjectGroupInstructorId(
                            studentTargetRequestDto.id(),
                            gradableEvent.getId(),
                            userService.getCurrentUser().getUserId()
                    ).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_NOT_FOUND));
                    default -> throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
                };
            }
            case StudentGroupTargetRequestDto studentGroupTargetRequestDto -> {
                List<Student> studentsInGroup = studentRepository.findByProjectIdAndProjectGroupIdAndInstructorId(
                        gradableEvent.getId(),
                        studentGroupTargetRequestDto.groupId(),
                        userService.getCurrentUser().getUserId()
                );

                if (studentsInGroup.isEmpty()) {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_GROUP_NOT_FOUND);
                }

                return studentsInGroup.getFirst();
            }
        }
    }

    private Student getSubmissionSourceForTargetRequestedByCoordinator(GradableEvent gradableEvent, TargetRequestDto target) {
        // request by coordinator
        //      target is student
        //          gradable event is assignment     -> get submissions for student
        //          gradable event is project        -> get submissions for student
        //      target is group
        //          gradable event is assignment     -> error
        //          gradable event is project        -> get submissions for random student in the project group
        switch (target) {
            case StudentTargetRequestDto studentTargetRequestDto -> {
                return switch (gradableEvent.getEventSection().getEventSectionType()) {
                    case ASSIGNMENT ->
                            studentRepository.findByUserIdAndGradableEventId(
                                    studentTargetRequestDto.id(),
                                    gradableEvent.getId()
                            ).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_NOT_FOUND));
                    case PROJECT -> studentRepository.findByUserIdAndProjectId(
                            studentTargetRequestDto.id(),
                            gradableEvent.getId()
                    ).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_NOT_FOUND));
                    default -> throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
                };
            }
            case StudentGroupTargetRequestDto studentGroupTargetRequestDto -> {
                List<Student> studentsInGroup = studentRepository.findByProjectIdAndProjectGroupId(
                        gradableEvent.getId(),
                        studentGroupTargetRequestDto.groupId()
                );

                if (studentsInGroup.isEmpty()) {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_GROUP_NOT_FOUND);
                }

                return studentsInGroup.getFirst();
            }
        }
    }

    private GradableEvent validateAndGetGradableEvent(Long gradableEventId) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(gradableEventId);
        accessAuthorizer.authorizeCourseAccess(gradableEvent.getEventSection().getCourse().getId());

        if (gradableEvent.getEventSection().getEventSectionType() == EventSectionType.TEST) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, SUBMISSION_TEST_SECTIONS_NOT_SUPPORTED);
        }

        return gradableEvent;
    }
}
