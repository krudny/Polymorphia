package com.agh.polymorphia_backend.service.mapper.gradable;

import com.agh.polymorphia_backend.dto.response.event.section.GradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.coursework.CourseworkResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.coursework.CourseworkSubmissionResponseDto;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.event.gradable.Coursework;
import com.agh.polymorphia_backend.model.event.submission.CourseworkSubmission;
import com.agh.polymorphia_backend.repository.event.submission.SubmissionRepository;
import com.agh.polymorphia_backend.service.GradeService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CourseworkMapper extends GradableEventMapper {
    private final SubmissionRepository submissionRepository;

    public CourseworkMapper(SubmissionRepository submissionRepository, GradeService gradeService) {
        super(gradeService);
        this.submissionRepository = submissionRepository;
    }

    public GradableEventResponseDto courseworkToGradableEventResponseDto(Coursework coursework, Animal animal) {
        CourseworkResponseDto event = new CourseworkResponseDto();

        event.setId(coursework.getId());
        event.setName(coursework.getName());
        event.setTopic(coursework.getTopic());
        event.setInfoUrl(coursework.getInfoUrl());
        event.setHidden(coursework.getHidden());
        event.setMaxXp(coursework.getMaxXp());

        setSubmission(coursework, animal, event);
        return setGradeAndRewards(event, coursework, animal);
    }

    private void setSubmission(Coursework coursework, Animal animal, CourseworkResponseDto event) {
        Optional<CourseworkSubmission> courseworkSubmission = submissionRepository.findByAnimalAndCoursework(animal, coursework);
        CourseworkSubmissionResponseDto submission = new CourseworkSubmissionResponseDto();

        submission.setContainsExtraAssignment(coursework.getContainsExtraAssignment());
        submission.setPrUrl(courseworkSubmission.map(CourseworkSubmission::getPrUrl).orElse(null));
        submission.setExtraAssignmentPrUrl(courseworkSubmission.map(CourseworkSubmission::getExtraAssignmentPrUrl).orElse(null));
        submission.setCreatedDate(courseworkSubmission.map(CourseworkSubmission::getCreatedDate).orElse(null));
        submission.setModifiedDate(courseworkSubmission.map(CourseworkSubmission::getModifiedDate).orElse(null));

        event.setSubmitted(submission.getPrUrl() != null);
        event.setSubmission(submission);

    }
}
