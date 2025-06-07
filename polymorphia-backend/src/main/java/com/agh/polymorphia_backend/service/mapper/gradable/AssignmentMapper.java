package com.agh.polymorphia_backend.service.mapper.gradable;

import com.agh.polymorphia_backend.dto.response.event.gradable.GradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.event.gradable.GradableEventShortResponseDto;
import com.agh.polymorphia_backend.dto.response.event.gradable.assignment.AssignmentResponseDto;
import com.agh.polymorphia_backend.dto.response.event.gradable.assignment.AssignmentSubmissionResponseDto;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.event.gradable.Assignment;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.event.submission.AssignmentSubmission;
import com.agh.polymorphia_backend.repository.event.submission.SubmissionRepository;
import com.agh.polymorphia_backend.service.GradeService;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.agh.polymorphia_backend.service.DbExtractingUtil.DB_OBJECT_NOT_FOUND;
import static com.agh.polymorphia_backend.service.DbExtractingUtil.FIELD_GRADABLE_EVENT;

@Service
public class AssignmentMapper extends GradableEventMapper {
    private final SubmissionRepository submissionRepository;

    public AssignmentMapper(SubmissionRepository submissionRepository, GradeService gradeService) {
        super(gradeService);
        this.submissionRepository = submissionRepository;
    }

    @Override
    public GradableEventResponseDto toGradableEventResponseDto(GradableEvent<?> gradableEvent, Animal animal) {
        Assignment assignment = getAssignment(gradableEvent);
        AssignmentResponseDto event = AssignmentResponseDto.builder()
                .id(assignment.getId())
                .name(assignment.getName())
                .topic(assignment.getTopic())
                .infoUrl(assignment.getInfoUrl())
                .hidden(assignment.getHidden())
                .maxXp(assignment.getMaxXp())
                .build();

        setSubmission(assignment, animal, event);
        return setGradeAndRewards(event, assignment, animal);
    }

    @Override
    public GradableEventShortResponseDto toShortResponseDto(GradableEvent<?> gradableEvent, Animal animal) {
        Assignment assignment = getAssignment(gradableEvent);

        return GradableEventShortResponseDto.builder()
                .id(assignment.getId())
                .name(assignment.getName())
                .topic(assignment.getTopic())
                .build();
    }

    private Assignment getAssignment(GradableEvent<?> gradableEvent) {
        try {
            return (Assignment) gradableEvent;
        } catch (ClassCastException e) {
            throw new InvalidArgumentException(String.format(
                    DB_OBJECT_NOT_FOUND,
                    FIELD_GRADABLE_EVENT,
                    gradableEvent.getId()
            ));
        }
    }

    private void setSubmission(Assignment assignment, Animal animal, AssignmentResponseDto event) {
        Optional<AssignmentSubmission> assignmentSubmission = submissionRepository.findByAnimalAndAssignment(animal, assignment);
        AssignmentSubmissionResponseDto submission = AssignmentSubmissionResponseDto.builder()
                .containsExtraAssignment(assignment.getContainsExtraAssignment())
                .prUrl(assignmentSubmission.map(AssignmentSubmission::getPrUrl).orElse(null))
                .extraAssignmentPrUrl(assignmentSubmission.map(AssignmentSubmission::getExtraAssignmentPrUrl).orElse(null))
                .createdDate(assignmentSubmission.map(AssignmentSubmission::getCreatedDate).orElse(null))
                .modifiedDate(assignmentSubmission.map(AssignmentSubmission::getModifiedDate).orElse(null))
                .build();

        event.setSubmission(submission);

    }
}
