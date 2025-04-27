package com.agh.polymorphia_backend.dto.response.course.reward.item;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@SuperBuilder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class ItemResponseDto {
    private long id;
    private String name;
    private String description;
    private String imageUrl;
    private int limit;
    private String textBonus;
    private long eventSectionId;
    private List<Long> chestIds;
    private String textBehavior;
}
