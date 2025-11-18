package com.agh.polymorphia_backend.dto.request.grade;

import com.agh.polymorphia_backend.dto.request.reward.ShortAssignedRewardRequestDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


@Builder
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@EqualsAndHashCode
public class CriterionGradeRequestDto {
    private BigDecimal gainedXp;

    @Builder.Default
    @JsonSetter(nulls = Nulls.AS_EMPTY)
    private List<ShortAssignedRewardRequestDto> assignedRewards = new ArrayList<>();
}
