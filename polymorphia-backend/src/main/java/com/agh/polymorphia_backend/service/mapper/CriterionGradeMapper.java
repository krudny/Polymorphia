package com.agh.polymorphia_backend.service.mapper;


import com.agh.polymorphia_backend.dto.response.criteria.CriterionGradeResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.assigned.ShortAssignedRewardResponseDto;
import com.agh.polymorphia_backend.model.criterion.CriterionGrade;
import com.agh.polymorphia_backend.service.reward.AssignedRewardService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CriterionGradeMapper {

    private final AssignedRewardMapper assignedRewardMapper;
    private final AssignedRewardService assignedRewardService;

    public CriterionGradeResponseDto toCriterionGradeResponseDto(CriterionGrade criterionGrade) {
        List<ShortAssignedRewardResponseDto> assignedRewards = assignedRewardMapper.rewardsToShortResponseDto(
                assignedRewardService.getCriterionGradeAssignedRewards(criterionGrade)
        );
        return CriterionGradeResponseDto.builder()
                .criterionId(criterionGrade.getCriterion().getId())
                .gainedXp(criterionGrade.getXp())
                .assignedRewards(assignedRewards)
                .build();
    }
}
