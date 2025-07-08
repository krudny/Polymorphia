package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.user.UserRequestDto;
import com.agh.polymorphia_backend.dto.response.user.CsrfTokenResponseDto;
import com.agh.polymorphia_backend.dto.response.user.UserResponseDto;
import com.agh.polymorphia_backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @GetMapping("/csrf-token")
    public ResponseEntity<CsrfTokenResponseDto> getCsrfToken(HttpServletRequest request, HttpSessionCsrfTokenRepository repository) {
        CsrfToken token = repository.loadToken(request);
        if (token == null) {
            token = repository.generateToken(request);
            repository.saveToken(token, request, null);
        }

        HttpSession session = request.getSession();
        System.out.println("SESSION: " + session.getId());
        System.out.println("TOKEN: " + token.getToken());
        return ResponseEntity.ok(new CsrfTokenResponseDto(token.getToken()));
    }

    @PostMapping()
    public ResponseEntity<Void> addUser(@RequestBody UserRequestDto userDto) {
        Long userId = userService.addUser(userDto);
        return Util.getCreatedResponseEntity(userId);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

}
