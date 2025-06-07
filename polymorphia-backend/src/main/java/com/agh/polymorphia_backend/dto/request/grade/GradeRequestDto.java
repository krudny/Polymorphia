package com.agh.polymorphia_backend.dto.request.grade;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

@SuperBuilder
@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "type",
        visible = true
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = TestGradeRequestDto.class, name = "TEST"),
        @JsonSubTypes.Type(value = AssignmentGradeRequestDto.class, name = "ASSIGNMENT"),
        @JsonSubTypes.Type(value = ProjectGradeRequestDto.class, name = "PROJECT")
})
public class GradeRequestDto {
    @NotNull
    private EventSectionType type;

    @NotNull
    private Long courseGroupId;

    @NotNull
    private Long gradableEventId;

    @NotNull
    @Positive
    @Digits(integer = 3, fraction = 1)
    private BigDecimal xp;

    @NotNull
    private List<Long> chestIds;
}
