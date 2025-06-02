package com.agh.polymorphia_backend.dto.request.grade;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

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
        @JsonSubTypes.Type(value = CourseworkGradeRequestDto.class, name = "COURSEWORK"),
        @JsonSubTypes.Type(value = ProjectGradeRequestDto.class, name = "PROJECT")
})
public class GradeRequestDto {
    @NotEmpty
    private GradeType type;

    @NotNull
    private Long gradedObjectId;

        @NotNull
        private Long courseGroupId;

        @NotNull
        private Long gradableEventId;

    private Float xp;

    private List<Long> chestIds;
}
