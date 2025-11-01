package com.agh.polymorphia_backend.service.invitation;

import com.agh.polymorphia_backend.dto.request.user.CourseInvitationRequestDto;
import com.agh.polymorphia_backend.dto.request.user.GroupInvitationRequestDto;
import com.agh.polymorphia_backend.dto.request.user.RegisterRequestDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.course.CourseGroup;
import com.agh.polymorphia_backend.model.course.StudentCourseGroupAssignment;
import com.agh.polymorphia_backend.model.course.StudentCourseGroupAssignmentId;
import com.agh.polymorphia_backend.model.invitation.InvitationToken;
import com.agh.polymorphia_backend.model.user.*;
import com.agh.polymorphia_backend.repository.course.CourseGroupRepository;
import com.agh.polymorphia_backend.repository.course.StudentCourseGroupRepository;
import com.agh.polymorphia_backend.repository.invitation.InvitationTokenRepository;
import com.agh.polymorphia_backend.repository.user.UserCourseRoleRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import com.agh.polymorphia_backend.repository.user.role.CoordinatorRepository;
import com.agh.polymorphia_backend.repository.user.role.InstructorRepository;
import com.agh.polymorphia_backend.repository.user.role.StudentRepository;
import com.agh.polymorphia_backend.service.email.EmailService;
import com.agh.polymorphia_backend.service.course.CourseService;
import com.agh.polymorphia_backend.service.user.UserFactory;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import com.agh.polymorphia_backend.service.validation.InvitationTokenValidator;
import com.agh.polymorphia_backend.service.validation.UserValidator;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class InvitationService {
    public static final String UNSUPPORTED_ROLE = "Nieobsługiwana rola.";
    public static final String FAILED_TO_INVITE = "Nie udało się wysłać zaproszenia.";
    public static final String USER_NOT_EXIST = "Użytkownik nie istanieje.";

    private final RegisterUtil registerUtil;
    private final UserFactory userFactory;
    private final PasswordEncoder passwordEncoder;
    private final InvitationTokenValidator invitationTokenValidator;
    private final InvitationTokenService invitationTokenService;
    private final InvitationTokenRepository invitationTokenRepository;
    private final EmailService emailService;
    private final UserCourseRoleRepository userCourseRoleRepository;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final CoordinatorRepository coordinatorRepository;
    private final InstructorRepository instructorRepository;
    private final StudentCourseGroupRepository studentCourseGroupRepository;
    private final CourseGroupRepository courseGroupRepository;
    private final CourseService courseService;
    private final UserValidator userValidator;
    private final AccessAuthorizer accessAuthorizer;

    @Transactional
    public void inviteUserToCourse(CourseInvitationRequestDto inviteDTO) {
        try {
            Course course = courseService.getCourseById(inviteDTO.getCourseId());

            accessAuthorizer.authorizeCourseAccess(course);

            validateInvitation(inviteDTO);
            AbstractRoleUser roleUser = createAndSaveRoleUser(inviteDTO);
            InvitationToken token = createAndSaveInvitationToken(inviteDTO);
            createAndSaveUserCourseRole(roleUser.getUser(), course, inviteDTO.getRole());
            sendInvitationEmail(inviteDTO, token);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, FAILED_TO_INVITE);
        }
    }

    @Transactional
    public void inviteUserToGroup(GroupInvitationRequestDto inviteDTO) {
        User user = userRepository.findByEmail(inviteDTO.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, USER_NOT_EXIST));

        CourseGroup courseGroup = courseGroupRepository.findById(inviteDTO.getCourseGroupId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Grupa kursu nie istenieje."));

        Course course = courseGroup.getCourse();
        accessAuthorizer.authorizeCourseAccess(course);

        try {
            switch (inviteDTO.getRole()) {
                case STUDENT:
                    addStudentToCourseGroup(user, courseGroup);
                    break;
                case INSTRUCTOR:
                    addInstructorToCourseGroup(user, courseGroup);
                    break;
                default:
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, UNSUPPORTED_ROLE);
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, FAILED_TO_INVITE);
        }
    }

    @Transactional
    public void registerUser(RegisterRequestDto registerDTO, HttpServletRequest request) {
        InvitationToken token = invitationTokenRepository.findByToken(registerDTO.getInvitationToken())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token nie istenieje."));

        User user = userRepository.findByEmail(token.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, USER_NOT_EXIST));

        invitationTokenValidator.validateTokenBeforeRegister(token);
        userValidator.validateUserRegistered(user);

        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        token.setUsed(true);

        try {
            userRepository.save(user);
            invitationTokenRepository.save(token);
            registerUtil.authenticateUserAndCreateSession(user.getEmail(), registerDTO.getPassword(), request);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Nie udało się utworzyć konta.");
        }

    }

    private void validateInvitation(CourseInvitationRequestDto inviteDTO) {
        String email = inviteDTO.getEmail();
        invitationTokenValidator.validateTokenBeforeInvitation(email);
        userValidator.validateUserNotExistsByEmail(email);

        if (inviteDTO.getRole() == UserType.STUDENT) {
            userValidator.validateUserNotExistsByIndexNumber(inviteDTO.getIndexNumber());
        }
    }

    private AbstractRoleUser createAndSaveRoleUser(CourseInvitationRequestDto inviteDTO) {
        return switch (inviteDTO.getRole()) {
            case STUDENT -> createAndSaveStudent(inviteDTO);
            case INSTRUCTOR -> createAndSaveInstructor(inviteDTO);
            case COORDINATOR -> createAndSaveCoordinator(inviteDTO);
            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, UNSUPPORTED_ROLE);
        };
    }

    private Student createAndSaveStudent(CourseInvitationRequestDto inviteDTO) {
        Student student = userFactory.createStudent(inviteDTO);
        return studentRepository.save(student);
    }

    private Instructor createAndSaveInstructor(CourseInvitationRequestDto inviteDTO) {
        Instructor instructor = userFactory.createInstructor(inviteDTO);
        return instructorRepository.save(instructor);
    }

    private Coordinator createAndSaveCoordinator(CourseInvitationRequestDto inviteDTO) {
        Coordinator coordinator = userFactory.createCoordinator(inviteDTO);
        return coordinatorRepository.save(coordinator);
    }

    private InvitationToken createAndSaveInvitationToken(CourseInvitationRequestDto inviteDTO) {
        InvitationToken token = invitationTokenService.createInvitationToken(inviteDTO);
        return invitationTokenRepository.save(token);
    }

    private void createAndSaveUserCourseRole(User user, Course course, UserType role) {
        UserCourseRoleId id = new UserCourseRoleId(user.getId(), course.getId());

        UserCourseRole userCourseRole = UserCourseRole.builder()
                .id(id)
                .role(role)
                .user(user)
                .course(course)
                .build();

        userCourseRoleRepository.save(userCourseRole);
    }

    private void sendInvitationEmail(CourseInvitationRequestDto inviteDTO, InvitationToken token) {
        emailService.sendInvitationEmail(inviteDTO, token);
    }

    private void addStudentToCourseGroup(User user, CourseGroup courseGroup) {
        Student student = studentRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Student nie istnieje."));

        StudentCourseGroupAssignmentId assignmentId = StudentCourseGroupAssignmentId.builder()
                .studentId(student.getUserId())
                .courseGroupId(courseGroup.getId())
                .build();

        if (studentCourseGroupRepository.existsById(assignmentId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Student jest już w tej grupie.");
        }

        StudentCourseGroupAssignment assignment = StudentCourseGroupAssignment.builder()
                .id(assignmentId)
                .student(student)
                .courseGroup(courseGroup)
                .build();

        studentCourseGroupRepository.save(assignment);
    }

    private void addInstructorToCourseGroup(User user, CourseGroup courseGroup) {
        Instructor instructor = instructorRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Prowadzący nie istnieje."));

        if (courseGroup.getInstructor() != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Grupa ma już przypisanego prowadzącego.”");
        }

        courseGroup.setInstructor(instructor);

        courseGroupRepository.save(courseGroup);
    }
}