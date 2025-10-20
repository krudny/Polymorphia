package com.agh.polymorphia_backend.service.user;

import com.agh.polymorphia_backend.dto.request.user.ChangePasswordRequestDto;
import com.agh.polymorphia_backend.dto.request.user.ForgotPasswordRequestDto;
import com.agh.polymorphia_backend.dto.request.user.NewPasswordRequestDto;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import com.agh.polymorphia_backend.service.email.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class PasswordService {
    public static final String PASSWORD_SIZE_MESSAGE = "Password must be between 8 and 256 characters";
    public static final String PASSWORD_UPPERCASE_MESSAGE = "Password must contain at least one uppercase letter";
    public static final String PASSWORD_LOWERCASE_MESSAGE = "Password must contain at least one lowercase letter";
    public static final String PASSWORD_DIGIT_MESSAGE = "Password must contain at least one digit";
    public static final String PASSWORD_SPECIAL_CHAR_MESSAGE = "Password must contain at least one special character";
    public static final String INVALID_OLD_PASSWORD = "Invalid old password";
    public static final String FAILED_TO_CHANGE_PASSWORD = "Failed to change password";
    public static final String INVALID_NEW_PASSWORD = "New password is not matching";
    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public void changePassword(ChangePasswordRequestDto requestDTO) {
        User user = userService.getCurrentUser().getUser();

        if (!requestDTO.getNewPassword().equals(requestDTO.getConfirmNewPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, INVALID_NEW_PASSWORD);
        }

        if (!passwordEncoder.matches(requestDTO.getOldPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, INVALID_OLD_PASSWORD);
        }

        try {
            user.setPassword(passwordEncoder.encode(requestDTO.getNewPassword()));
            userRepository.save(user);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, FAILED_TO_CHANGE_PASSWORD);
        }
    }

    public void forgotPassword(ForgotPasswordRequestDto requestDTO) {

    }

    public void newPassword(NewPasswordRequestDto requestDTO) {

    }
}
