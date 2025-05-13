package com.agh.polymorphia_backend.dto.request.course.reward.item;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "type",
        visible = true
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = FlatBonusRequestItemRequestDto.class, name = "FLAT_BONUS"),
        @JsonSubTypes.Type(value = PercentageBonusItemRequestDto.class, name = "PERCENTAGE_BONUS")
})
public class ItemRequestDto {
    @NotEmpty
    private String name;

    @NotEmpty
    private String description;

    @NotNull
    private Integer limit;

    @NotNull
    private ItemType type;

    @NotNull
    private Long eventSectionId;
}
