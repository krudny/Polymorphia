package com.agh.polymorphia_backend.dto.request.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ChangePasswordRequestDTO {
    @NotNull
    private String oldPassword;

    @NotNull
    @Size(min = 7, max = 16)
    private String newPassword;

    @NotNull
    @Size(min = 7, max = 16)
    private String confirmNewPassword;
}
