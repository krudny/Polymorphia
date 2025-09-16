package com.agh.polymorphia_backend.dto.response.user_context;

import com.agh.polymorphia_backend.model.user.UserType;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDetailsResponseDto {
    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private UserType userRole;

    @NotNull
    private BaseUserDetailsResponseDto userDetails;
}
