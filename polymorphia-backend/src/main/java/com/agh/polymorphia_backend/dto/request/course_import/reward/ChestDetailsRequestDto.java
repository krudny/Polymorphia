package com.agh.polymorphia_backend.dto.request.course_import.reward;

import com.agh.polymorphia_backend.model.reward.chest.ChestBehavior;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@EqualsAndHashCode
public class ChestDetailsRequestDto {
    @NotEmpty
    private String key;

    @NotEmpty
    private String name;

    @NotEmpty
    private String description;

    @NotEmpty
    private String imageUrl;

    @NotNull
    private ChestBehavior behavior;

    @NotNull
    private List<String> itemKeys;
}
