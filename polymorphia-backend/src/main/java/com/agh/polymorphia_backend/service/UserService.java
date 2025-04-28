package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.dto.request.user.UserRequestDto;
import com.agh.polymorphia_backend.dto.response.user.UserResponseDto;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import com.agh.polymorphia_backend.service.mapper.UserMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private static final String USER_NOT_FOUND = "User of id %s does not exist in the database";
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public Long addUser(UserRequestDto userRequestDto) {
        User user = userMapper.userRequestDtoToUser(userRequestDto);
        return userRepository.save(user).getId();
    }

    public UserResponseDto getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() ->
                new InvalidArgumentException(String.format(USER_NOT_FOUND, id)));
        return userMapper.userToUserResponseDto(user);
    }
}