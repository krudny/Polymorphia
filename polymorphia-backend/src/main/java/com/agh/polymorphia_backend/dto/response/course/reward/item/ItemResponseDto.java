package com.agh.polymorphia_backend.dto.response.course.reward.item;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@SuperBuilder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class ItemResponseDto {
    @NotNull
    private Long id;

    @NotEmpty
    private String name;

    @NotEmpty
    private String description;

    @NotEmpty
    private String imageUrl;

    @NotNull
    private Integer limit;

    @NotEmpty
    private String textBonus;

    @NotNull
    private Long eventSectionId;

    @NotNull
    private List<Long> chestIds;

    @NotEmpty
    private String textBehavior;
}
