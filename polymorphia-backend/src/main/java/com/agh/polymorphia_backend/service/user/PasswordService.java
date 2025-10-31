package com.agh.polymorphia_backend.service.user;

import com.agh.polymorphia_backend.dto.request.user.ChangePasswordRequestDto;
import com.agh.polymorphia_backend.dto.request.user.ForgotPasswordRequestDto;
import com.agh.polymorphia_backend.dto.request.user.NewPasswordRequestDto;
import com.agh.polymorphia_backend.model.Token.Token;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import com.agh.polymorphia_backend.service.email.EmailService;
import com.agh.polymorphia_backend.service.invitation.RegisterUtil;
import com.agh.polymorphia_backend.service.token.TokenService;
import com.agh.polymorphia_backend.service.validation.TokenValidator;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static com.agh.polymorphia_backend.service.invitation.InvitationService.USER_NOT_EXIST;

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
    public static final String FAILED_TO_RESET_PASSWORD = "Failed to reset password";
    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final TokenService tokenService;
    private final TokenValidator tokenValidator;

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
        String email = requestDTO.getEmail();

        try {
            userService.getUserByEmail(email);
        } catch (UsernameNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, USER_NOT_EXIST);
        }

        tokenValidator.isTokenAssigned(email);

        Token token = tokenService.createAndSaveToken(email);
        emailService.sendForgotPasswordEmail(requestDTO, token);
    }

    public void newPassword(NewPasswordRequestDto requestDTO) {
        Token token = tokenService.getTokenFromValue(requestDTO.getToken());
        User user = userService.getUserByEmail(token.getEmail());

        if (!requestDTO.getNewPassword().equals(requestDTO.getConfirmNewPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, INVALID_NEW_PASSWORD);
        }

        user.setPassword(passwordEncoder.encode(requestDTO.getNewPassword()));

        try {
            userRepository.save(user);
            tokenService.deleteToken(token);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, FAILED_TO_RESET_PASSWORD);
        }
    }
}
