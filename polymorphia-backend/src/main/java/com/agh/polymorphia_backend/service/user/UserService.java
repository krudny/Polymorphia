package com.agh.polymorphia_backend.service.user;

import com.agh.polymorphia_backend.dto.request.user.StudentInvitationRequestDTO;
import com.agh.polymorphia_backend.dto.request.user.StudentRegisterRequestDTO;
import com.agh.polymorphia_backend.model.user.*;
import com.agh.polymorphia_backend.repository.user.InvitationTokenRepository;
import com.agh.polymorphia_backend.repository.user.UserCourseRoleRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import com.agh.polymorphia_backend.repository.user.role.CoordinatorRepository;
import com.agh.polymorphia_backend.repository.user.role.InstructorRepository;
import com.agh.polymorphia_backend.repository.user.role.StudentRepository;
import com.agh.polymorphia_backend.service.EmailService;
import com.agh.polymorphia_backend.service.invitation_token.InvitationTokenService;
import com.agh.polymorphia_backend.service.validation.InvitationTokenValidator;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    public static final String USER_HAS_NO_VALID_ROLES = "User should have exactly one role";
    private static final String USER_NOT_FOUND = "User %s does not exist in the database";
    private final UserRepository userRepository;
    private final InvitationTokenService invitationTokenService;
    private final InvitationTokenValidator invitationTokenValidator;
    private final InvitationTokenRepository invitationTokenRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

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

//        Student student = Student.builder()
//                .email(token.getEmail())
//                .firstName(token.getFirstName())
//                .lastName(token.getLastName())
//                .password(passwordEncoder.encode(registerDTO.getPassword()))
//                .indexNumber(token.getIndexNumber())
//                .isActive(true)
//                .build();

        token.setUsed(true);

        try {
//            userRepository.save(student);
            invitationTokenRepository.save(token);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create account");
        }

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