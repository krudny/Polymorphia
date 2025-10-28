package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.submission.SubmissionRequirementResponseDto;
import com.agh.polymorphia_backend.model.submission.SubmissionRequirement;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SubmissionMapper {

    public SubmissionRequirementResponseDto toSubmissionRequirementResponseDto(SubmissionRequirement submissionRequirement) {
        return SubmissionRequirementResponseDto.builder()
                .id(submissionRequirement.getId())
                .name(submissionRequirement.getName())
                .isMandatory(submissionRequirement.isMandatory())
                .orderIndex(submissionRequirement.getOrderIndex())
                .build();
    }
}
