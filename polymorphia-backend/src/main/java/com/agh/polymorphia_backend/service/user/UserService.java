package com.agh.polymorphia_backend.service.user;

import com.agh.polymorphia_backend.dto.request.user.UserInvitationRequestDTO;
import com.agh.polymorphia_backend.model.user.InvitationToken;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.user.InvitationTokenRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import com.agh.polymorphia_backend.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private static final String USER_NOT_FOUND = "User %s does not exist in the database";
    private final UserRepository userRepository;
    private final InvitationTokenRepository invitationTokenRepository;
    private final EmailService emailService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND, email)));
    }

    @Transactional
    public void invite(UserInvitationRequestDTO inviteDTO) {
        String email = inviteDTO.getEmail();

        if (userRepository.findByEmail(email).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already exists");
        }

        try {
            InvitationToken token = createInvitationToken(inviteDTO);
            invitationTokenRepository.save(token);
            emailService.sendInvitationEmail(email, token);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to send invitation");
        }
    }

    private InvitationToken createInvitationToken(UserInvitationRequestDTO inviteDTO) {
        String tokenValue = UUID.randomUUID().toString();
        LocalDateTime now = LocalDateTime.now();

        return InvitationToken.builder()
                .userEmail(inviteDTO.getEmail())
                .firstName(inviteDTO.getFirstName())
                .lastName(inviteDTO.getLastName())
                .token(tokenValue)
                .expiryDate(now.plusHours(72))
                .createdAt(now)
                .used(false)
                .build();
    }

    private User createUser(String email, String firstName, String lastName, String hashedPassword) {
        return Student.builder()
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .password(hashedPassword)
                .build();
    }
}