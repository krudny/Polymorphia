package com.agh.polymorphia_backend.service.user;

import com.agh.polymorphia_backend.model.user.UndefinedUser;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.model.user.UserCourseRole;
import com.agh.polymorphia_backend.repository.user.UserCourseRoleRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import com.agh.polymorphia_backend.repository.user.role.CoordinatorRepository;
import com.agh.polymorphia_backend.repository.user.role.InstructorRepository;
import com.agh.polymorphia_backend.repository.user.role.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private static final String USER_NOT_FOUND = "User %s does not exist in the database";
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final CoordinatorRepository coordinatorRepository;
    private final InstructorRepository instructorRepository;
    private final UserCourseRoleRepository userCourseRoleRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserCourseRole> userCourseRole = userCourseRoleRepository.findUserCourseRoleByEmail(email);

        if (userCourseRole.isEmpty()) {
            return buildUndefinedUser(email);
        }

        return buildUserWithDefinedRole(userCourseRole.get(), email);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    public String getUserName(User user) {
        return String.join(" ", user.getFirstName(), user.getLastName());
    }

    public void updateSecurityCredentials(User user) {
        User reloadedUser = (User) loadUserByUsername(user.getEmail());

        Authentication newAuth = new UsernamePasswordAuthenticationToken(
                reloadedUser,
                reloadedUser.getPassword(),
                reloadedUser.getAuthorities()
        );

        SecurityContextHolder.getContext().setAuthentication(newAuth);
    }

    private User buildUndefinedUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND, email)));

        return UndefinedUser.builder()
                .email(email)
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .password(user.getPassword())
                .preferredCourse(user.getPreferredCourse())
                .build();
    }

    private User buildUserWithDefinedRole(UserCourseRole userCourseRole, String email) {
        return (switch (userCourseRole.getRole()) {
            case STUDENT -> studentRepository.findById(userCourseRole.getUser().getId());
            case INSTRUCTOR -> instructorRepository.findById(userCourseRole.getUser().getId());
            case COORDINATOR -> coordinatorRepository.findById(userCourseRole.getUser().getId());
            default -> throw new UsernameNotFoundException(String.format(USER_NOT_FOUND, email));
        })
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND, email)));
    }

}