package com.agh.polymorphia_backend.service.user;

import com.agh.polymorphia_backend.dto.request.user.ChangePasswordRequestDTO;
import com.agh.polymorphia_backend.model.user.*;
import com.agh.polymorphia_backend.repository.user.UserCourseRoleRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import com.agh.polymorphia_backend.repository.user.role.CoordinatorRepository;
import com.agh.polymorphia_backend.repository.user.role.InstructorRepository;
import com.agh.polymorphia_backend.repository.user.role.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    public static final String USER_HAS_NO_VALID_ROLES = "User should have exactly one role";
    private static final String USER_NOT_FOUND = "User %s does not exist in the database";
    private static final String INVALID_OLD_PASSWORD = "Invalid old password";
    private static final String FAILED_TO_CHANGE_PASSWORD = "Failed to change password";
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final CoordinatorRepository coordinatorRepository;
    private final InstructorRepository instructorRepository;
    private final UserCourseRoleRepository userCourseRoleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserCourseRole> userCourseRole = userCourseRoleRepository.findUserCourseRoleByEmail(email);

        if (userCourseRole.isEmpty()) {
            return buildUndefinedUser(email);
        }

        return buildUserWithDefinedRole(userCourseRole.get(), email);
    }

    public AbstractRoleUser getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (AbstractRoleUser) authentication.getPrincipal();
    }

    public UserType getUserRole(AbstractRoleUser user) {
        Set<UserType> roles = user.getAuthorities().stream()
                .map(a -> UserType.valueOf(a.getAuthority()))
                .collect(Collectors.toSet());

        if (roles.size() != 1) {
            throw new IllegalStateException(USER_HAS_NO_VALID_ROLES);
        }

        return roles.iterator().next();
    }


    public String getFullName(User user) {
        return String.join(" ", user.getFirstName(), user.getLastName());
    }

    public void changePassword(ChangePasswordRequestDTO requestDTO) {
        User user = getCurrentUser().getUser();

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

    public void updateSecurityCredentials(User user) {
        UserDetails reloadedUser = loadUserByUsername(user.getEmail());

        Authentication newAuth = new UsernamePasswordAuthenticationToken(
                reloadedUser,
                reloadedUser.getPassword(),
                reloadedUser.getAuthorities()
        );

        SecurityContextHolder.getContext().setAuthentication(newAuth);
    }

    private UserDetails buildUndefinedUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND, email)));
        return UndefinedUser.builder()
                .user(user)
                .build();
    }

    private AbstractRoleUser buildUserWithDefinedRole(UserCourseRole userCourseRole, String email) {
        Long userId = userCourseRole.getUser().getId();
        return (switch (userCourseRole.getRole()) {
            case STUDENT -> studentRepository.findById(userId);
            case INSTRUCTOR -> instructorRepository.findById(userId);
            case COORDINATOR -> coordinatorRepository.findById(userId);
            default -> throw new UsernameNotFoundException(String.format(USER_NOT_FOUND, email));
        })
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND, email)));
    }

}