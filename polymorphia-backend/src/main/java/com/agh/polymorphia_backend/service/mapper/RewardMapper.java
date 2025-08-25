package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.reward.BaseRewardResponseDto;
import com.agh.polymorphia_backend.model.course.reward.Reward;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RewardMapper {
    public BaseRewardResponseDto rewardToRewardResponseDto(Reward reward) {
        return BaseRewardResponseDto.builder()
                .id(reward.getId())
                .orderIndex(reward.getOrderIndex())
                .name(reward.getName())
                .imageUrl(reward.getImageUrl())
                .build();
    }
}
