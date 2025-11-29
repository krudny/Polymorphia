package com.agh.polymorphia_backend.dto.response.profile;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Data
public class StudentSummaryResponseDto extends BaseProfileResponseDto {
    @NotNull
    private String studentName;

    @NotNull
    private String animalName;

    @NotNull
    private String imageUrl;

    @NotNull
    private Integer position;
}
