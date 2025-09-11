package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.user.AbstractRoleUser;
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

import static com.agh.polymorphia_backend.service.course.CourseService.COURSE_NOT_FOUND;

@Service
@AllArgsConstructor
public class AccessAuthorizer {
    private final UserService userService;
    private final InstructorRepository instructorRepository;
    private final StudentRepository studentRepository;

    public void authorizeCourseAccess(Course course) {
        AbstractRoleUser user = userService.getCurrentUser();

        if (!isCourseAccessAuthorized(user, course)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    COURSE_NOT_FOUND
            );
        }
    }

    public void authorizePreferredCourseSwitch(Course course) {
        User user = userService.getCurrentUser().getUser();

        if (!isPreferredCourseSwitchAuthorized(user, course)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    COURSE_NOT_FOUND
            );
        }
    }

    public boolean hasAnyRole(List<UserType> roles) {
        AbstractRoleUser user = userService.getCurrentUser();
        return roles.contains(userService.getUserRole(user));
    }

    private boolean isCourseAccessAuthorized(AbstractRoleUser roleUser, Course course) {
        UserType role = userService.getUserRole(roleUser);
        User user = roleUser.getUser();

        return switch (role) {
            case STUDENT -> isCourseAccessAuthorizedStudent(user, course);
            case INSTRUCTOR -> isCourseAccessAuthorizedInstructor(user, course);
            case COORDINATOR -> isCourseAccessAuthorizedCoordinator(user, course);
            case UNDEFINED -> throw new ResponseStatusException(HttpStatus.NOT_FOUND, COURSE_NOT_FOUND);
        };
    }

    private boolean isPreferredCourseSwitchAuthorized(User user, Course course) {
        return isCourseAccessAuthorizedStudent(user, course)
                || isCourseAccessAuthorizedInstructor(user, course)
                || isCourseAccessAuthorizedCoordinator(user, course);
    }


    private boolean isCourseAccessAuthorizedCoordinator(User user, Course course) {
        return course.getCoordinator().getUser().equals(user);
    }

    private boolean isCourseAccessAuthorizedInstructor(User user, Course course) {
        return instructorRepository.findByUserIdAndCourseId(user.getId(), course.getId()).isPresent();
    }

    private boolean isCourseAccessAuthorizedStudent(User user, Course course) {
        return studentRepository.findByUserIdAndCourseId(user.getId(), course.getId()).isPresent();
    }
}
