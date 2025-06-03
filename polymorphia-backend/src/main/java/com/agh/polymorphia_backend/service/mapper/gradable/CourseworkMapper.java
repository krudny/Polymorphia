package com.agh.polymorphia_backend.service.mapper.gradable;

import com.agh.polymorphia_backend.dto.response.event.gradable.GradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.event.gradable.GradableEventShortResponseDto;
import com.agh.polymorphia_backend.dto.response.event.gradable.coursework.CourseworkResponseDto;
import com.agh.polymorphia_backend.dto.response.event.gradable.coursework.CourseworkSubmissionResponseDto;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.event.gradable.Coursework;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.event.submission.CourseworkSubmission;
import com.agh.polymorphia_backend.repository.event.submission.SubmissionRepository;
import com.agh.polymorphia_backend.service.GradeService;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.agh.polymorphia_backend.service.DbExtractingUtil.DB_OBJECT_NOT_FOUND;
import static com.agh.polymorphia_backend.service.DbExtractingUtil.FIELD_GRADABLE_EVENT;

@Service
public class CourseworkMapper extends GradableEventMapper {
    private final SubmissionRepository submissionRepository;

    public CourseworkMapper(SubmissionRepository submissionRepository, GradeService gradeService) {
        super(gradeService);
        this.submissionRepository = submissionRepository;
    }

    @Override
    public GradableEventResponseDto toGradableEventResponseDto(GradableEvent<?> gradableEvent, Animal animal) {
        Coursework coursework = getCoursework(gradableEvent);
        CourseworkResponseDto event = CourseworkResponseDto.builder()
                .id(coursework.getId())
                .name(coursework.getName())
                .topic(coursework.getTopic())
                .infoUrl(coursework.getInfoUrl())
                .hidden(coursework.getHidden())
                .maxXp(coursework.getMaxXp())
                .build();

        setSubmission(coursework, animal, event);
        return setGradeAndRewards(event, coursework, animal);
    }

    @Override
    public GradableEventShortResponseDto toShortResponseDto(GradableEvent<?> gradableEvent, Animal animal) {
        Coursework coursework = getCoursework(gradableEvent);

        return GradableEventShortResponseDto.builder()
                .id(coursework.getId())
                .name(coursework.getName())
                .topic(coursework.getTopic())
                .build();
    }

    private Coursework getCoursework(GradableEvent<?> gradableEvent) {
        try {
            return (Coursework) gradableEvent;
        } catch (ClassCastException e) {
            throw new InvalidArgumentException(String.format(
                    DB_OBJECT_NOT_FOUND,
                    FIELD_GRADABLE_EVENT,
                    gradableEvent.getId()
            ));
        }
    }

    private void setSubmission(Coursework coursework, Animal animal, CourseworkResponseDto event) {
        Optional<CourseworkSubmission> courseworkSubmission = submissionRepository.findByAnimalAndCoursework(animal, coursework);
        CourseworkSubmissionResponseDto submission = CourseworkSubmissionResponseDto.builder()
                .containsExtraAssignment(coursework.getContainsExtraAssignment())
                .prUrl(courseworkSubmission.map(CourseworkSubmission::getPrUrl).orElse(null))
                .extraAssignmentPrUrl(courseworkSubmission.map(CourseworkSubmission::getExtraAssignmentPrUrl).orElse(null))
                .createdDate(courseworkSubmission.map(CourseworkSubmission::getCreatedDate).orElse(null))
                .modifiedDate(courseworkSubmission.map(CourseworkSubmission::getModifiedDate).orElse(null))
                .build();

        event.setSubmitted(submission.getPrUrl() != null);
        event.setSubmission(submission);

    }
}
