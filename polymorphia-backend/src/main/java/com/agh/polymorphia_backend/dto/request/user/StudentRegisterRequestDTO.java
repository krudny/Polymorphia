package com.agh.polymorphia_backend.dto.request.user;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentRegisterRequestDTO {
    @NotBlank
    private String animalName;

    @NotBlank
    private String invitationToken;

    @NotBlank
    private String password;
}