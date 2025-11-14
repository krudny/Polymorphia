package com.agh.polymorphia_backend.service.invitation;

import com.agh.polymorphia_backend.dto.request.user.CourseInvitationRequestDto;
import com.agh.polymorphia_backend.dto.request.user.GroupInvitationRequestDto;
import com.agh.polymorphia_backend.dto.request.user.RegisterRequestDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.course.CourseGroup;
import com.agh.polymorphia_backend.model.course.StudentCourseGroupAssignment;
import com.agh.polymorphia_backend.model.course.StudentCourseGroupAssignmentId;
import com.agh.polymorphia_backend.model.email_event.CourseInvitationEvent;
import com.agh.polymorphia_backend.model.token.Token;
import com.agh.polymorphia_backend.model.token.TokenType;
import com.agh.polymorphia_backend.model.user.*;
import com.agh.polymorphia_backend.repository.course.CourseGroupRepository;
import com.agh.polymorphia_backend.repository.course.StudentCourseGroupRepository;
import com.agh.polymorphia_backend.repository.user.UserCourseRoleRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import com.agh.polymorphia_backend.repository.user.role.CoordinatorRepository;
import com.agh.polymorphia_backend.repository.user.role.InstructorRepository;
import com.agh.polymorphia_backend.repository.user.role.StudentRepository;
import com.agh.polymorphia_backend.service.email.EmailService;
import com.agh.polymorphia_backend.service.course.CourseService;
import com.agh.polymorphia_backend.service.token.TokenService;
import com.agh.polymorphia_backend.service.user.UserFactory;
import com.agh.polymorphia_backend.service.user.UserService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import com.agh.polymorphia_backend.service.validation.TokenValidator;
import com.agh.polymorphia_backend.service.validation.UserValidator;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class InvitationService {
    public static final String UNSUPPORTED_ROLE = "Unsupported role";
    public static final String FAILED_TO_INVITE = "Failed to send invitation";
    public static final String FAILED_TO_REGISTER = "Failed to create account";
    public static final String USER_NOT_EXIST = "User doesn't exist";
    public static final String COURSE_GROUP_NOT_EXIST = "Course group doesn't exist";
    public static final String STUDENT_NOT_EXIST = "Student doesn't exist";
    public static final String STUDENT_ALREADY_IN_GROUP = "Student is already in this group";
    public static final String INSTRUCTOR_NOT_EXIST = "Instructor doesn't exist";
    public static final String GROUP_HAS_INSTRUCTOR = "Group already has an assigned instructor";

    private final RegisterUtil registerUtil;
    private final UserFactory userFactory;
    private final PasswordEncoder passwordEncoder;
    private final TokenValidator tokenValidator;
    private final TokenService tokenService;
    private final UserService userService;
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
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public void inviteUserToCourse(CourseInvitationRequestDto inviteDTO) {
        try {
            Course course = courseService.getCourseById(inviteDTO.getCourseId());
            accessAuthorizer.authorizeCourseAccess(course);

            validateInvitation(inviteDTO);
            AbstractRoleUser roleUser = createAndSaveRoleUser(inviteDTO);
            Token token = tokenService.createAndSaveToken(inviteDTO.getEmail(), TokenType.INVITATION);
            createAndSaveUserCourseRole(roleUser.getUser(), course, inviteDTO.getRole());

            eventPublisher.publishEvent(new CourseInvitationEvent(inviteDTO, token));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, FAILED_TO_INVITE);
        }
    }

    @Transactional
    public void inviteUserToGroup(GroupInvitationRequestDto inviteDTO) {
        User user = userRepository.findByEmail(inviteDTO.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, USER_NOT_EXIST));

        CourseGroup courseGroup = courseGroupRepository.findById(inviteDTO.getCourseGroupId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, COURSE_GROUP_NOT_EXIST));

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
        Token token = tokenService.getTokenFromValue(registerDTO.getInvitationToken());
        tokenValidator.validateTokenBeforeUse(token, TokenType.INVITATION);

        User user = userService.getUserByEmail(token.getEmail());
        userValidator.validateUserRegistered(user);

        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));

        try {
            userRepository.save(user);
            registerUtil.authenticateUserAndCreateSession(user.getEmail(), registerDTO.getPassword(), request);
            tokenService.deleteToken(token);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, FAILED_TO_REGISTER);
        }
    }

    private void validateInvitation(CourseInvitationRequestDto inviteDTO) {
        String email = inviteDTO.getEmail();
        tokenValidator.isTokenAssigned(email, TokenType.INVITATION);
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

    private void addStudentToCourseGroup(User user, CourseGroup courseGroup) {
        Student student = studentRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, STUDENT_NOT_EXIST));

        StudentCourseGroupAssignmentId assignmentId = StudentCourseGroupAssignmentId.builder()
                .studentId(student.getUserId())
                .courseGroupId(courseGroup.getId())
                .build();

        if (studentCourseGroupRepository.existsById(assignmentId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, STUDENT_ALREADY_IN_GROUP);
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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, INSTRUCTOR_NOT_EXIST));

        if (courseGroup.getInstructor() != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, GROUP_HAS_INSTRUCTOR);
        }

        courseGroup.setInstructor(instructor);
        courseGroupRepository.save(courseGroup);
    }
}