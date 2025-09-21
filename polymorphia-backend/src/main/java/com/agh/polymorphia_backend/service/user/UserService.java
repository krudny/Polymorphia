package com.agh.polymorphia_backend.service.user;

import com.agh.polymorphia_backend.model.user.InvitationToken;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.user.InvitationTokenRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private static final String USER_NOT_FOUND = "User %s does not exist in the database";
    private final UserRepository userRepository;
    private final InvitationTokenRepository invitationTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordService passwordService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND, email)));
    }

    public void invite(String email, String firstName, String lastName) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already exists");
        }

        String temporaryPassword = passwordService.generateTemporaryPassword(12);
        String hashedPassword = passwordEncoder.encode(temporaryPassword);

        User newUser = createUser(email, firstName, lastName, hashedPassword);
        InvitationToken token = createInvitationToken(email);

        userRepository.save(newUser);
        invitationTokenRepository.save(token);


    }

    private InvitationToken createInvitationToken(String email) {
        String invitationToken = UUID.randomUUID().toString();

        return InvitationToken.builder()
                .userEmail(email)
                .token(invitationToken)
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