package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.criteria.CriterionAssignableRewardResponseDto;
import com.agh.polymorphia_backend.dto.response.criteria.CriterionResponseDto;
import com.agh.polymorphia_backend.model.course.reward.Item;
import com.agh.polymorphia_backend.model.course.reward.RewardType;
import com.agh.polymorphia_backend.model.criterion.Criterion;
import com.agh.polymorphia_backend.model.criterion.CriterionReward;
import com.agh.polymorphia_backend.service.course.reward.AssignedRewardService;
import com.agh.polymorphia_backend.util.NumberFormatter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CriterionMapper {
    private final RewardMapper rewardMapper;
    private final AssignedRewardService assignedRewardService;

    public CriterionResponseDto toCriterionResponseDto(Criterion criterion) {
        List<CriterionAssignableRewardResponseDto> assignableRewards = criterion.getAssignableRewards().stream()
                .map(this::toCriterionAssignableRewardResponseDto)
                .toList();

        return CriterionResponseDto.builder()
                .id(criterion.getId())
                .name(criterion.getName())
                .maxXp(NumberFormatter.formatToString(criterion.getMaxXp()))
                .assignableRewards(assignableRewards)
                .build();
    }

    private CriterionAssignableRewardResponseDto toCriterionAssignableRewardResponseDto(CriterionReward criterionReward) {
        Integer maxAmount = criterionReward.getMaxAmount();

        if (criterionReward.getReward().getRewardType().equals(RewardType.ITEM)) {
            Item item = ((Item) (criterionReward.getReward()));
            int currentQuantity = 0;
            //TODO: implement passing studentId to this endpoint
//            currentQuantity=assignedRewardService.getCurrentItemCount(,item, Optional.empty());
            maxAmount = Math.min(maxAmount, item.getLimit()) - currentQuantity;
        }

        return CriterionAssignableRewardResponseDto.builder()
                .maxAmount(maxAmount)
                .assignableReward(rewardMapper.rewardToRewardResponseDtoWithType(criterionReward.getReward()))
                .build();
    }
}
