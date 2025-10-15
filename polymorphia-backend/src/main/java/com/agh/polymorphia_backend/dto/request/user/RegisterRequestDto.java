package com.agh.polymorphia_backend.dto.request.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDto {
    // TODO: import those messages after [OG-114] is merged
    private static final String PASSWORD_SIZE_MESSAGE = "Password must be between 8 and 256 characters";
    private static final String PASSWORD_UPPERCASE_MESSAGE = "Password must contain at least one uppercase letter";
    private static final String PASSWORD_LOWERCASE_MESSAGE = "Password must contain at least one lowercase letter";
    private static final String PASSWORD_DIGIT_MESSAGE = "Password must contain at least one digit";
    private static final String PASSWORD_SPECIAL_CHAR_MESSAGE = "Password must contain at least one special character";

    @NotBlank
    private String invitationToken;

    @NotNull
    @Size(min = 8, max = 256, message = PASSWORD_SIZE_MESSAGE)
    @Pattern(regexp = ".*[A-Z].*", message = PASSWORD_UPPERCASE_MESSAGE)
    @Pattern(regexp = ".*[a-z].*", message = PASSWORD_LOWERCASE_MESSAGE)
    @Pattern(regexp = ".*[0-9].*", message = PASSWORD_DIGIT_MESSAGE)
    @Pattern(regexp = ".*[^A-Za-z0-9].*", message = PASSWORD_SPECIAL_CHAR_MESSAGE)
    private String password;
}