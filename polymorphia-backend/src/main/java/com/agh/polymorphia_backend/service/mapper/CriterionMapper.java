package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.criteria.CriterionAssignableRewardResponseDto;
import com.agh.polymorphia_backend.dto.response.criteria.CriterionResponseDto;
import com.agh.polymorphia_backend.model.criterion.Criterion;
import com.agh.polymorphia_backend.model.criterion.CriterionReward;
import com.agh.polymorphia_backend.util.NumberFormatter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CriterionMapper {
    private final RewardMapper rewardMapper;

    public CriterionResponseDto toCriterionResponseDto(Criterion criterion, Long animalId) {
        List<CriterionAssignableRewardResponseDto> assignableRewards = criterion.getAssignableRewards().stream()
                .map(criterionReward -> toCriterionAssignableRewardResponseDto(criterionReward, animalId))
                .toList();

        return CriterionResponseDto.builder()
                .id(criterion.getId())
                .name(criterion.getName())
                .maxXp(NumberFormatter.formatToString(criterion.getMaxXp()))
                .assignableRewards(assignableRewards)
                .build();
    }

    private CriterionAssignableRewardResponseDto toCriterionAssignableRewardResponseDto(CriterionReward criterionReward, Long animalId) {
        return CriterionAssignableRewardResponseDto.builder()
                .maxAmount(criterionReward.getMaxAmount())
                .assignableReward(rewardMapper.rewardToRewardResponseDtoWithType(criterionReward.getReward(), animalId))
                .build();
    }
}
