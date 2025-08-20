package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.reward.RewardResponseDto;
import com.agh.polymorphia_backend.model.course.reward.Reward;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RewardMapper {
    public RewardResponseDto rewardToRewardResponseDto(Reward reward) {
        return RewardResponseDto.builder()
                .id(reward.getId())
                .orderIndex(reward.getOrderIndex())
                .name(reward.getName())
                .imageUrl(reward.getImageUrl())
                .build();
    }
}
