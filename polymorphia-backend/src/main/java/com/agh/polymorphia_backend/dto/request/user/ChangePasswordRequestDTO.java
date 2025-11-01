package com.agh.polymorphia_backend.dto.request.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ChangePasswordRequestDTO {
    public static final String PASSWORD_SIZE_MESSAGE = "hasło musi mieć od 8 do 256 znaków";
    public static final String PASSWORD_UPPERCASE_MESSAGE = "hasło musi zawierać co najmniej jedną wielką literę";
    public static final String PASSWORD_LOWERCASE_MESSAGE = "hasło musi zawierać co najmniej jedną małą literę";
    public static final String PASSWORD_DIGIT_MESSAGE = "hasło musi zawierać co najmniej jedną cyfrę";
    public static final String PASSWORD_SPECIAL_CHAR_MESSAGE = "hasło musi zawierać co najmniej jeden znak specjalny";

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

