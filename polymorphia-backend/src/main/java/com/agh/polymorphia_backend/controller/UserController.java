package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.user.UserRequestDto;
import com.agh.polymorphia_backend.dto.response.user.UserResponseDto;
import com.agh.polymorphia_backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

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
