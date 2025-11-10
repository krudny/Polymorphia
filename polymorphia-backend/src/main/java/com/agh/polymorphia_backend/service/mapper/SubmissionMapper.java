package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.submission.SubmissionDetailsDto;
import com.agh.polymorphia_backend.dto.response.submission.SubmissionDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.submission.SubmissionRequirementResponseDto;
import com.agh.polymorphia_backend.model.submission.Submission;
import com.agh.polymorphia_backend.model.submission.SubmissionRequirement;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class SubmissionMapper {
    private static final SubmissionDetailsDto EMPTY_SUBMISSION =
            SubmissionDetailsDto.builder().url("").isLocked(false).build();

    public SubmissionRequirementResponseDto toSubmissionRequirementResponseDto(
            SubmissionRequirement submissionRequirement) {
        return SubmissionRequirementResponseDto.builder().id(submissionRequirement.getId())
                .name(submissionRequirement.getName()).isMandatory(submissionRequirement.isMandatory())
                .orderIndex(submissionRequirement.getOrderIndex()).build();
    }

    public SubmissionDetailsResponseDto toSubmissionDetailsResponseDto(List<Submission> submissions,
                                                                       List<SubmissionRequirement> submissionRequirements) {
        Map<Long, SubmissionDetailsDto> details = new HashMap<>();
        submissions.forEach(submission -> details.put(submission.getSubmissionRequirement().getId(),
                toSubmissionDetails(submission)));

        submissionRequirements.forEach(
                submissionRequirement -> details.putIfAbsent(submissionRequirement.getId(), EMPTY_SUBMISSION));

        return SubmissionDetailsResponseDto.builder().details(details).modifiedDate(
                submissions.stream().map(Submission::getModifiedDate).filter(Objects::nonNull)
                        .max(Comparator.naturalOrder()).orElse(null)).build();
    }

    private SubmissionDetailsDto toSubmissionDetails(Submission submission) {
        return SubmissionDetailsDto.builder().url(submission.getUrl()).isLocked(submission.isLocked()).build();
    }
}
