package com.agh.polymorphia_backend.dto.request.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ChangePasswordRequestDTO {
    public static final String PASSWORD_SIZE_MESSAGE = "Password must be between 8 and 256 characters";
    public static final String PASSWORD_UPPERCASE_MESSAGE = "Password must contain at least one uppercase letter";
    public static final String PASSWORD_LOWERCASE_MESSAGE = "Password must contain at least one lowercase letter";
    public static final String PASSWORD_DIGIT_MESSAGE = "Password must contain at least one digit";
    public static final String PASSWORD_SPECIAL_CHAR_MESSAGE = "Password must contain at least one special character";

    @NotNull
    private String oldPassword;

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
}

