package com.agh.polymorphia_backend.dto.item;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
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

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "type",
        visible = true
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = FlatBonusItemDto.class, name = "FLAT_BONUS"),
        @JsonSubTypes.Type(value = PercentageBonusItemDto.class, name = "PERCENTAGE_BONUS")
})
public class ItemDto {
    private long id;
    private String name;
    private String description;
    private String imageUrl;
    private int limit;
    private String textBonus;
    private long eventSectionId;
    private ItemType type;
    private List<Long> chestIds;
    private String textBehavior;
}
