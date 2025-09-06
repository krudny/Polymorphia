package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.user.role.InstructorRepository;
import com.agh.polymorphia_backend.repository.user.role.StudentRepository;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.agh.polymorphia_backend.service.course.CourseService.COURSE_NOT_FOUND;

@Service
@AllArgsConstructor
public class AccessAuthorizer {
    public static final String USER_HAS_NO_VALID_ROLES = "User has no valid roles";
    private final UserService userService;
    private final InstructorRepository instructorRepository;
    private final StudentRepository studentRepository;

    public void authorizeCourseAccess(Course course) {
        User user = userService.getCurrentUser();

        if (!isCourseAccessAuthorized(user, course)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    COURSE_NOT_FOUND
            );
        }
    }

    public void authorizePreferredCourseSwitch(Course course) {
        User user = userService.getCurrentUser();

        if (!isPreferredCourseSwitchAuthorized(user, course)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    COURSE_NOT_FOUND
            );
        }
    }

    public boolean hasAnyRole(List<UserType> roles) {
        User user = userService.getCurrentUser();
        return getUserRoles(user).stream().anyMatch(roles::contains);
    }

    public Set<UserType> getUserRoles(User user) {
        Set<UserType> roles = user.getAuthorities().stream()
                .map(a -> UserType.valueOf(a.getAuthority()))
                .collect(Collectors.toSet());

        if (roles.isEmpty()) {
            throw new IllegalStateException(USER_HAS_NO_VALID_ROLES);
        }

        return roles;
    }

    private boolean isCourseAccessAuthorized(User user, Course course) {
        UserType role = getUserRoles(user).iterator().next();

        return switch (role) {
            case STUDENT -> isCourseAccessAuthorizedStudent(user, course);
            case INSTRUCTOR -> isCourseAccessAuthorizedInstructor(user, course);
            case COORDINATOR -> isCourseAccessAuthorizedCoordinator(user, course);
            case UNDEFINED -> throw new IllegalStateException(USER_HAS_NO_VALID_ROLES);
        };
    }

    private boolean isPreferredCourseSwitchAuthorized(User user, Course course) {
        return isCourseAccessAuthorizedStudent(user, course)
                || isCourseAccessAuthorizedInstructor(user, course)
                || isCourseAccessAuthorizedCoordinator(user, course);
    }


    private boolean isCourseAccessAuthorizedCoordinator(User user, Course course) {
        return course.getCoordinator().equals(user);
    }

    private boolean isCourseAccessAuthorizedInstructor(User user, Course course) {
        return instructorRepository.findByUserIdAndCourseId(user.getId(), course.getId()).isPresent();
    }

    private boolean isCourseAccessAuthorizedStudent(User user, Course course) {
        return studentRepository.findByUserIdAndCourseId(user.getId(), course.getId()).isPresent();
    }
}
