package com.agh.polymorphia_backend.dto.request.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import static com.agh.polymorphia_backend.service.user.PasswordService.*;

@Data
public class NewPasswordRequestDto {
    @NotNull
    @Size(min = 8, max = 256, message = PASSWORD_SIZE_MESSAGE)
    @Pattern(regexp = ".*[A-Z].*", message = PASSWORD_UPPERCASE_MESSAGE)
    @Pattern(regexp = ".*[a-z].*", message = PASSWORD_LOWERCASE_MESSAGE)
    @Pattern(regexp = ".*[0-9].*", message = PASSWORD_DIGIT_MESSAGE)
    @Pattern(regexp = ".*[^A-Za-z0-9].*", message = PASSWORD_SPECIAL_CHAR_MESSAGE)
    private String newPassword;

    @NotNull
    @Size(min = 8, max = 256, message = PASSWORD_SIZE_MESSAGE)
    private String confirmNewPassword;

    @NotBlank
    private String token;
}


