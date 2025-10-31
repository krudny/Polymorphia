package com.agh.polymorphia_backend.service.submission;

import com.agh.polymorphia_backend.dto.request.SubmissionDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.target.StudentGroupTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.StudentTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.TargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.TargetType;
import com.agh.polymorphia_backend.dto.response.submission.SubmissionDetailsDto;
import com.agh.polymorphia_backend.dto.response.submission.SubmissionRequirementResponseDto;
import com.agh.polymorphia_backend.model.event_section.EventSectionType;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.project.ProjectGroup;
import com.agh.polymorphia_backend.model.submission.Submission;
import com.agh.polymorphia_backend.model.submission.SubmissionRequirement;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.project.ProjectGroupRepository;
import com.agh.polymorphia_backend.repository.submission.SubmissionRepository;
import com.agh.polymorphia_backend.repository.submission.SubmissionRequirementRepository;
import com.agh.polymorphia_backend.repository.user.role.StudentRepository;
import com.agh.polymorphia_backend.service.gradable_event.GradableEventService;
import com.agh.polymorphia_backend.service.mapper.SubmissionMapper;
import com.agh.polymorphia_backend.service.student.AnimalService;
import com.agh.polymorphia_backend.service.user.UserService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SubmissionService {
    private static final String SUBMISSION_TEST_SECTIONS_NOT_SUPPORTED = "Submissions for test event sections is not supported";
    private static final String STUDENT_NOT_FOUND = "Student not found";
    private static final String STUDENT_GROUP_NOT_FOUND = "Student group not found";
    private static final String INVALID_TARGET = "Group target is supported only for project section";
    private static final String UNSUPPORTED_ROLE = "User must have valid role";
    private static final String INCOMPLETE_DETAILS = "Submission details must contain each requirement";
    private static final String SUBMISSION_LOCKED = "You can't change locked submission";
    private static final String FORBIDDEN_LOCK_CHANGE = "Students can't change lock status of the submission";
    private static final String MANDATORY_MISSING = "Mandatory submission is missing";
    private static final String PERSISTENCE_ERROR = "Unable to save submission";

    private final GradableEventService gradableEventService;
    private final AccessAuthorizer accessAuthorizer;
    private final SubmissionRequirementRepository submissionRequirementRepository;
    private final SubmissionMapper submissionMapper;
    private final UserService userService;
    private final SubmissionRepository submissionRepository;
    private final ProjectGroupRepository projectGroupRepository;
    private final StudentRepository studentRepository;
    private final AnimalService animalService;

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
        GradableEvent gradableEvent = validateAndGetGradableEventForTarget(gradableEventId, target);

        List<Student> submissionSources = getSubmissionSourcesForTarget(gradableEvent, target);

        List<SubmissionRequirement> submissionRequirements = submissionRequirementRepository.getSubmissionRequirementsByGradableEvent(gradableEvent);
        List<Submission> submissions = submissionRepository.getSubmissionsByGradableEventAndStudent(gradableEventId, submissionSources.getFirst().getUserId());

        return submissionMapper.toSubmissionDetailsResponseDto(submissions, submissionRequirements);
    }

    @Transactional
    public void putSubmissionDetails(Long gradableEventId, SubmissionDetailsRequestDto requestDto) {
        GradableEvent gradableEvent = validateAndGetGradableEventForTarget(gradableEventId, requestDto.target());

        List<Student> submissionSources = getSubmissionSourcesForTarget(gradableEvent, requestDto.target());

        Map<Long, SubmissionRequirement> submissionRequirements = submissionRequirementRepository.getSubmissionRequirementsByGradableEvent(gradableEvent).stream().collect(Collectors.toMap(SubmissionRequirement::getId, Function.identity()));

        Set<Long> submissionRequirementsIds = submissionRequirements.keySet();
        Set<Long> receivedSubmissionRequirementsIds = requestDto.details().keySet();

        if (submissionRequirementsIds.size() != receivedSubmissionRequirementsIds.size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, INCOMPLETE_DETAILS);
        }

        // studentId -> (submissionRequirementId -> submission)
        Map<Long, Map<Long, Submission>> submissionsPerStudent = submissionSources.stream().collect(Collectors.toMap(Student::getUserId, (submissionSource) -> submissionRepository
                .getSubmissionsByGradableEventAndStudent(
                        gradableEventId,
                        submissionSource.getUserId()
                ).stream()
                .collect(Collectors
                        .toMap((submission) ->
                                        submission.getSubmissionRequirement().getId(),
                                Function.identity()))));

        List<Submission> submissionsToDelete = new ArrayList<>();
        List<Submission> submissionsToUpdate = new ArrayList<>();

        requestDto.details().forEach((submissionRequirementId, newDetails) -> {
            List<Submission> submissions = new ArrayList<>();
            submissionsPerStudent
                    .forEach((studentId, studentSubmissions) ->
                            submissions.add(studentSubmissions.get(submissionRequirementId)));

            boolean isEmpty = !newDetails.isLocked() && newDetails.url().isEmpty();

            Optional.ofNullable(submissions.getFirst()).ifPresentOrElse(currentSubmission -> {
                boolean isLockChanged = currentSubmission.isLocked() != newDetails.isLocked();
                boolean isUrlChanged = !Objects.equals(currentSubmission.getUrl(), newDetails.url());
                boolean isChanged =  isLockChanged || isUrlChanged;

                if (userService.getCurrentUserRole() == UserType.STUDENT &&
                        isEmpty &&
                        submissionRequirements.get(submissionRequirementId).isMandatory()) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, MANDATORY_MISSING);
                }

                if (!isChanged) {
                    return;
                }

                if (userService.getCurrentUserRole() == UserType.STUDENT) {
                    if (currentSubmission.isLocked()) {
                        throw new ResponseStatusException(HttpStatus.FORBIDDEN, SUBMISSION_LOCKED);
                    }

                    if (isLockChanged) {
                        throw new ResponseStatusException(HttpStatus.FORBIDDEN, FORBIDDEN_LOCK_CHANGE);
                    }
                }

                if (isEmpty) {
                    submissionsToDelete.addAll(submissions);
                } else {
                    submissions.forEach(submission -> {
                        submission.setUrl(newDetails.url());
                        submission.setLocked(newDetails.isLocked());
                    });
                    submissionsToUpdate.addAll(submissions);
                }
            }, () -> {
                if (userService.getCurrentUserRole() == UserType.STUDENT && newDetails.isLocked()) {
                    throw new ResponseStatusException(HttpStatus.FORBIDDEN, FORBIDDEN_LOCK_CHANGE);
                }

                if (isEmpty) {
                    return;
                }

                submissionSources.forEach(student -> {
                    Submission submission = Submission.builder()
                            .submissionRequirement(submissionRequirements.get(submissionRequirementId))
                            .animal(animalService.getAnimal(
                                    student.getUserId(),
                                    gradableEvent.getEventSection().getCourse().getId()))
                            .url(newDetails.url())
                            .isLocked(newDetails.isLocked())
                            .build();
                    submissionsToUpdate.add(submission);
                });
            });
        });

        try {
            submissionRepository.saveAll(submissionsToUpdate);
            submissionRepository.deleteAll(submissionsToDelete);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, PERSISTENCE_ERROR);
        }
    }

    private List<Student> getSubmissionSourcesForTarget(GradableEvent gradableEvent, TargetRequestDto target) {
        return switch (userService.getCurrentUserRole()) {
            case STUDENT -> getSubmissionSourcesForTargetRequestedByStudent(gradableEvent, target);
            case INSTRUCTOR -> getSubmissionSourcesForTargetRequestedByInstructor(gradableEvent, target);
            case COORDINATOR -> getSubmissionSourcesForTargetRequestedByCoordinator(gradableEvent, target);
            case UNDEFINED -> throw new ResponseStatusException(HttpStatus.FORBIDDEN, UNSUPPORTED_ROLE);
        };
    }

    private List<Student> getSubmissionSourcesForTargetRequestedByStudent(GradableEvent gradableEvent, TargetRequestDto target) {
        switch (target) {
            case StudentTargetRequestDto studentTargetRequestDto -> {
                if (userService.getCurrentUser().getUserId().longValue() != studentTargetRequestDto.id().longValue()) {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_NOT_FOUND);
                }
                switch (gradableEvent.getEventSection().getEventSectionType()) {
                    case ASSIGNMENT -> {
                        return List.of((Student) userService.getCurrentUser());
                    }
                    case PROJECT -> {
                        ProjectGroup projectGroup = projectGroupRepository.getProjectGroupByStudentIdAndProjectId(
                                        userService.getCurrentUser().getUserId(),
                                        gradableEvent.getId())
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_NOT_FOUND));

                        return getStudentsFromProjectGroup(projectGroup);
                    }
                    default -> throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            case StudentGroupTargetRequestDto studentGroupTargetRequestDto -> {
                ProjectGroup projectGroup = projectGroupRepository.getProjectGroupByIdAndStudentIdAndProjectId(
                                studentGroupTargetRequestDto.groupId(),
                                userService.getCurrentUser().getUserId(),
                                gradableEvent.getId())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_GROUP_NOT_FOUND));

                return getStudentsFromProjectGroup(projectGroup);
            }
        }
    }

    private List<Student> getSubmissionSourcesForTargetRequestedByInstructor(GradableEvent gradableEvent, TargetRequestDto target) {
        switch (target) {
            case StudentTargetRequestDto studentTargetRequestDto -> {
                switch (gradableEvent.getEventSection().getEventSectionType()) {
                    case ASSIGNMENT -> {
                        return List.of(studentRepository.findByUserIdAndGradableEventIdAndCourseGroupInstructorId(
                                studentTargetRequestDto.id(),
                                gradableEvent.getId(),
                                userService.getCurrentUser().getUserId()
                        ).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_NOT_FOUND)));
                    }
                    case PROJECT -> {
                        ProjectGroup projectGroup = projectGroupRepository.getProjectGroupByStudentIdAndProjectIdAndInstructorId(
                                studentTargetRequestDto.id(),
                                gradableEvent.getId(),
                                userService.getCurrentUser().getUserId()
                        ).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_NOT_FOUND));

                        return getStudentsFromProjectGroup(projectGroup);
                    }
                    default -> throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            case StudentGroupTargetRequestDto studentGroupTargetRequestDto -> {
                ProjectGroup projectGroup = projectGroupRepository.getProjectGroupByIdAndProjectIdAndInstructorId(
                        studentGroupTargetRequestDto.groupId(),
                        gradableEvent.getId(),
                        userService.getCurrentUser().getUserId()
                ).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_GROUP_NOT_FOUND));

                return getStudentsFromProjectGroup(projectGroup);
            }
        }
    }

    private List<Student> getSubmissionSourcesForTargetRequestedByCoordinator(GradableEvent gradableEvent, TargetRequestDto target) {
        switch (target) {
            case StudentTargetRequestDto studentTargetRequestDto -> {
                switch (gradableEvent.getEventSection().getEventSectionType()) {
                    case ASSIGNMENT -> {
                        return List.of(studentRepository.findByUserIdAndGradableEventId(
                                studentTargetRequestDto.id(),
                                gradableEvent.getId()
                        ).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_NOT_FOUND)));
                    }
                    case PROJECT -> {
                        ProjectGroup projectGroup = projectGroupRepository.getProjectGroupByStudentIdAndProjectId(
                                studentTargetRequestDto.id(),
                                gradableEvent.getId()
                        ).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_NOT_FOUND));

                        return getStudentsFromProjectGroup(projectGroup);
                    }
                    default -> throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            case StudentGroupTargetRequestDto studentGroupTargetRequestDto -> {
                ProjectGroup projectGroup = projectGroupRepository.getProjectGroupByIdAndProjectId(
                        studentGroupTargetRequestDto.groupId(),
                        gradableEvent.getId()
                ).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_GROUP_NOT_FOUND));

                return getStudentsFromProjectGroup(projectGroup);
            }
        }
    }

    private List<Student> getStudentsFromProjectGroup(ProjectGroup projectGroup) {
        return projectGroup.getAnimals().stream()
                .map(animal -> animal.getStudentCourseGroupAssignment().getStudent())
                .toList();
    }

    private GradableEvent validateAndGetGradableEventForTarget(Long gradableEventId, TargetRequestDto target) {
        GradableEvent gradableEvent = validateAndGetGradableEvent(gradableEventId);
        if (target.type() == TargetType.STUDENT_GROUP &&
                gradableEvent.getEventSection().getEventSectionType() != EventSectionType.PROJECT) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, INVALID_TARGET);
        }

        return gradableEvent;
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
