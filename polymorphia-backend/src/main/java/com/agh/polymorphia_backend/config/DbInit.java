package com.agh.polymorphia_backend.config;

import com.agh.polymorphia_backend.model.user.Coordinator;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class DbInit {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final InitialUserProperties initialUserProperties;

    @PostConstruct
    public void init() {
        if (userRepository.findByEmail(initialUserProperties.email()).isEmpty()) {
            Coordinator coordinator = Coordinator.builder()
                    .firstName(initialUserProperties.firstName())
                    .lastName(initialUserProperties.lastName())
                    .email(initialUserProperties.email())
                    .password(passwordEncoder.encode(initialUserProperties.password()))
                    .isActive(true)
                    .build();

            userRepository.save(coordinator);
        }
    }
}
