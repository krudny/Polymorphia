package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.user.ChangePasswordRequestDto;
import com.agh.polymorphia_backend.dto.request.user.ForgotPasswordRequestDto;
import com.agh.polymorphia_backend.dto.request.user.NewPasswordRequestDto;
import com.agh.polymorphia_backend.service.password.PasswordService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/password")
@AllArgsConstructor
public class PasswordController {
    private final PasswordService passwordService;

    @PostMapping("/change-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> changePassword(@RequestBody ChangePasswordRequestDto requestDTO) {
        passwordService.changePassword(requestDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@RequestBody ForgotPasswordRequestDto requestDTO) {
        passwordService.forgotPassword(requestDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/new-password")
    public ResponseEntity<Void> newPassword(@RequestBody NewPasswordRequestDto requestDTO) {
        passwordService.newPassword(requestDTO);
        return ResponseEntity.ok().build();
    }
}
