package com.agh.polymorphia_backend.service.invitation;

import com.agh.polymorphia_backend.dto.request.user.InvitationRequestDTO;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.invitation.InvitationToken;
import com.agh.polymorphia_backend.model.user.*;
import com.agh.polymorphia_backend.repository.invitation.InvitationTokenRepository;
import com.agh.polymorphia_backend.repository.user.UserCourseRoleRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import com.agh.polymorphia_backend.repository.user.role.CoordinatorRepository;
import com.agh.polymorphia_backend.repository.user.role.InstructorRepository;
import com.agh.polymorphia_backend.repository.user.role.StudentRepository;
import com.agh.polymorphia_backend.service.EmailService;
import com.agh.polymorphia_backend.service.course.CourseService;
import com.agh.polymorphia_backend.service.invitation_token.InvitationTokenService;
import com.agh.polymorphia_backend.service.user.UserFactory;
import com.agh.polymorphia_backend.service.validation.InvitationTokenValidator;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import static com.agh.polymorphia_backend.model.user.UserType.STUDENT;

@Service
@AllArgsConstructor
public class InvitationService {
    private final UserFactory userFactory;
    private final InvitationTokenValidator invitationTokenValidator;
    private final InvitationTokenService invitationTokenService;
    private final InvitationTokenRepository invitationTokenRepository;
    private final EmailService emailService;
    public static final String UNSUPPORTED_ROLE = "Unsupported role";
    private final UserCourseRoleRepository userCourseRoleRepository;
    private final StudentRepository studentRepository;
    private final CoordinatorRepository coordinatorRepository;
    private final InstructorRepository instructorRepository;
    private final CourseService courseService;

    @Transactional
    public void inviteUser(InvitationRequestDTO inviteDTO) {
        try {
            Course course = courseService.getCourseById(inviteDTO.getCourseId());

            validateInvitation(inviteDTO);

            AbstractRoleUser roleUser = createAndSaveRoleUser(inviteDTO);

            InvitationToken token = createAndSaveInvitationToken(inviteDTO);

            createAndSaveUserCourseRole(roleUser.getUser(), course, inviteDTO.getRole());

            sendInvitationEmail(inviteDTO.getEmail(), token);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to send invitation");
        }
    }

    private void validateInvitation(InvitationRequestDTO inviteDTO) {
        if (inviteDTO.getRole() == UserType.STUDENT) {
            invitationTokenValidator.validateBeforeInvitation(
                    inviteDTO.getEmail(),
                    inviteDTO.getIndexNumber()
            );
        } else {
            invitationTokenValidator.validateBeforeInvitation(inviteDTO.getEmail(), null);
        }
    }

    private AbstractRoleUser createAndSaveRoleUser(InvitationRequestDTO inviteDTO) {
        return switch (inviteDTO.getRole()) {
            case STUDENT -> createAndSaveStudent(inviteDTO);
            case INSTRUCTOR -> createAndSaveInstructor(inviteDTO);
            case COORDINATOR -> createAndSaveCoordinator(inviteDTO);
            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, UNSUPPORTED_ROLE);
        };
    }

    private Student createAndSaveStudent(InvitationRequestDTO inviteDTO) {
        Student student = userFactory.createStudent(inviteDTO);
        return studentRepository.save(student);
    }

    private Instructor createAndSaveInstructor(InvitationRequestDTO inviteDTO) {
        Instructor instructor = userFactory.createInstructor(inviteDTO);
        return instructorRepository.save(instructor);
    }

    private Coordinator createAndSaveCoordinator(InvitationRequestDTO inviteDTO) {
        Coordinator coordinator = userFactory.createCoordinator(inviteDTO);
        return coordinatorRepository.save(coordinator);
    }

    private InvitationToken createAndSaveInvitationToken(InvitationRequestDTO inviteDTO) {
        InvitationToken token = invitationTokenService.createInvitationToken(inviteDTO);
        return invitationTokenRepository.save(token);
    }

    private void createAndSaveUserCourseRole(User user, Course course, UserType role) {
        UserCourseRole userCourseRole = UserCourseRole.builder()
                .role(role)
                .user(user)
                .course(course)
                .build();
        userCourseRoleRepository.save(userCourseRole);
    }

    private void sendInvitationEmail(String email, InvitationToken token) {
        emailService.sendInvitationEmail(email, token);
    }
}