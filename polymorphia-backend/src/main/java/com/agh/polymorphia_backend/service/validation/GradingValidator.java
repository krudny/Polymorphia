package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.dto.request.grade.CriterionGradeRequestDto;
import com.agh.polymorphia_backend.dto.request.grade.GradeRequestDto;
import com.agh.polymorphia_backend.dto.request.reward.ShortAssignedRewardRequestDto;
import com.agh.polymorphia_backend.model.course.reward.Reward;
import com.agh.polymorphia_backend.model.criterion.Criterion;
import com.agh.polymorphia_backend.model.criterion.CriterionReward;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.service.course.reward.RewardService;
import com.agh.polymorphia_backend.service.criterion.CriterionService;
import com.agh.polymorphia_backend.util.NumberFormatter;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class GradingValidator {
    private static final String MAX_XP_EXCEEDED = "Do tego kryterium można przypisać maksymalnie %s xp";
    private static final String MAX_REWARD_COUNT_EXCEEDED = "Do tego kryterium można przypisać maksymalnie %s nagród typu %s";
    private static final String CRITERION_NOT_IN_GRADABLE_EVENT = "Kryterium %d nie należy do eventu %s";
    private final CriterionService criterionService;
    private final RewardService rewardService;

    public void validate(GradeRequestDto request, GradableEvent gradableEvent) {
        request.getCriteria().forEach((criterionId, criterionRequest) ->
                validateCriterion(gradableEvent, criterionId, criterionRequest));
    }

    private void validateCriterion(GradableEvent gradableEvent, Long criterionId, CriterionGradeRequestDto criterionRequest) {
        Criterion criterion = criterionService.findById(criterionId);
        validateCriterionInGradableEvent(criterion, gradableEvent);
        validateXpOverload(criterion, criterionRequest);
        validateAssignedRewards(criterion, criterionRequest);
    }


    private void validateCriterionInGradableEvent(Criterion criterion, GradableEvent gradableEvent) {
        if (!criterion.getGradableEvent().equals(gradableEvent)) {
            String message = String.format(CRITERION_NOT_IN_GRADABLE_EVENT, criterion.getId(), gradableEvent.getName());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
        }
    }

    private void validateXpOverload(Criterion criterion, CriterionGradeRequestDto criterionGradeRequest) {
        if (criterion.getMaxXp().compareTo(criterionGradeRequest.getGainedXp()) < 0) {
            String message = String.format(
                    MAX_XP_EXCEEDED,
                    NumberFormatter.formatToString(criterion.getMaxXp())
            );

            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
        }
    }

    private void validateAssignedRewards(Criterion criterion, CriterionGradeRequestDto criterionGradeRequest) {
        criterionGradeRequest.getAssignedRewards().forEach(reward -> validateAssignedReward(criterion, reward));
    }

    private void validateAssignedReward(Criterion criterion, ShortAssignedRewardRequestDto rewardRequest) {
        Reward reward = rewardService.findById(rewardRequest.getRewardId());
        Integer quantity = rewardRequest.getQuantity();
        Integer maxAmount = criterion.getAssignableRewards().stream()
                .filter(assignableReward -> assignableReward.getReward().getId().equals(rewardRequest.getRewardId()))
                .findFirst()
                .map(CriterionReward::getMaxAmount)
                .orElse(0);


        if (maxAmount < quantity) {
            String message = String.format(MAX_REWARD_COUNT_EXCEEDED, maxAmount, reward.getName());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
        }
    }


}
