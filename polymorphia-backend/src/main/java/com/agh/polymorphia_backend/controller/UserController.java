package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.user.RegisterRequestDTO;
import com.agh.polymorphia_backend.dto.request.user.UserInvitationRequestDTO;
import com.agh.polymorphia_backend.service.user.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {
    private UserService userService;

    @PostMapping("/invite")
    public ResponseEntity<Void> inviteUser(@Valid @RequestBody UserInvitationRequestDTO inviteDTO) {
        userService.invite(inviteDTO);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/register")
    public ResponseEntity<Void> registerUser(@Valid @RequestBody RegisterRequestDTO registerDTO) {
        userService.createUser(registerDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}

