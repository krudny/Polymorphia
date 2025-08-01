package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.repository.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private static final String USER_NOT_FOUND = "User %s does not exist in the database";
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
//    private final UserMapper userMapper;
//
//    public Long addUser(UserRequestDto userRequestDto) {
//        User user = userMapper.userRequestDtoToUser(userRequestDto);
//        String encodedPassword = passwordEncoder.encode(userRequestDto.getPassword());
//        user.setPassword(encodedPassword);
//        return userRepository.save(user).getId();
//    }
//
//    public UserResponseDto getUserById(Long id) {
//        User user = userRepository.findById(id).orElseThrow(() ->
//                new InvalidArgumentException(String.format(USER_NOT_FOUND, id)));
//        return userMapper.userToUserResponseDto(user);
//    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND, email)));
    }
}