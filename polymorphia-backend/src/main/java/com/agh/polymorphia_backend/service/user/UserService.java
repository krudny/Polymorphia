package com.agh.polymorphia_backend.service.user;

import com.agh.polymorphia_backend.dto.request.user.StudentInvitationRequestDTO;
import com.agh.polymorphia_backend.dto.request.user.StudentRegisterRequestDTO;
import com.agh.polymorphia_backend.model.user.InvitationToken;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.repository.user.InvitationTokenRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import com.agh.polymorphia_backend.service.EmailService;
import com.agh.polymorphia_backend.service.invitation_token.InvitationTokenService;
import com.agh.polymorphia_backend.service.validation.InvitationTokenValidator;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private static final String USER_NOT_FOUND = "User %s does not exist in the database";
    private final UserRepository userRepository;
    private final InvitationTokenService invitationTokenService;
    private final InvitationTokenValidator invitationTokenValidator;
    private final InvitationTokenRepository invitationTokenRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND, email)));
    }

    @Transactional
    public void inviteStudent(StudentInvitationRequestDTO inviteDTO) {
        String email = inviteDTO.getEmail();
        Integer indexNumber = inviteDTO.getIndexNumber();

        invitationTokenValidator.validateBeforeInvitation(email, indexNumber);

        try {
            InvitationToken newToken = invitationTokenService.createInvitationToken(inviteDTO);
            invitationTokenRepository.save(newToken);
            emailService.sendInvitationEmail(email, newToken);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to send invitation");
        }
    }

    @Transactional
    public void registerStudent(StudentRegisterRequestDTO registerDTO) {
        InvitationToken token = invitationTokenRepository.findByToken(registerDTO.getInvitationToken())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token doesn't exist"));

        invitationTokenValidator.validateBeforeRegister(token);

        Student student = Student.builder()
                .email(token.getEmail())
                .firstName(token.getFirstName())
                .lastName(token.getLastName())
                .password(passwordEncoder.encode(registerDTO.getPassword()))
                .indexNumber(token.getIndexNumber())
                .isActive(true)
                .build();

        token.setUsed(true);

        try {
            userRepository.save(student);
            invitationTokenRepository.save(token);
        } catch  (Exception e) {
            System.err.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create account");
        }

    }
}