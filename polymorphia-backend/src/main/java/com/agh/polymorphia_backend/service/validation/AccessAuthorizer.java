package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.user.AbstractRoleUser;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.model.user.UserCourseRole;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.course.AnimalRepository;
import com.agh.polymorphia_backend.repository.course.CourseRepository;
import com.agh.polymorphia_backend.repository.user.UserCourseRoleRepository;
import com.agh.polymorphia_backend.repository.user.role.InstructorRepository;
import com.agh.polymorphia_backend.repository.user.role.StudentRepository;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static com.agh.polymorphia_backend.service.course.CourseService.COURSE_NOT_FOUND;

// TODO: to change to look up in user course role table
@Service
@AllArgsConstructor
public class AccessAuthorizer {
    private final static String USER_COURSE_ROLE_NOT_FOUND = "User course role not found";
    private final UserService userService;
    private final UserCourseRoleRepository userCourseRoleRepository;
    private final InstructorRepository instructorRepository;
    private final StudentRepository studentRepository;
    private final AnimalRepository animalRepository;
    private final CourseRepository courseRepository;

    public void authorizeCourseAccess(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, COURSE_NOT_FOUND));

        authorizeCourseAccess(course);
    }

    public void authorizeCourseAccess(Course course) {
        AbstractRoleUser user = userService.getCurrentUser();

        if (!isCourseAccessAuthorized(user, course)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    COURSE_NOT_FOUND
            );
        }
    }

    public boolean authorizePreferredCourseSwitch(Course course) {
        User user = userService.getCurrentUser().getUser();

        UserCourseRole userCourseRole = userCourseRoleRepository
                .findByUserIdAndCourseId(user.getId(), course.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, USER_COURSE_ROLE_NOT_FOUND));

        if (userCourseRole.getRole() == UserType.STUDENT) {
            Optional<Animal> animal = animalRepository.findByCourseIdAndStudentId(course.getId(), user.getId());
            return animal.isPresent();
        }

        return true;
    }

    public boolean hasAnyRole(List<UserType> roles) {
        AbstractRoleUser user = userService.getCurrentUser();
        return roles.contains(userService.getUserRole(user));
    }

    public boolean isCourseAccessAuthorized(AbstractRoleUser roleUser, Course course) {
        UserType role = userService.getUserRole(roleUser);
        User user = roleUser.getUser();

        return switch (role) {
            case STUDENT -> isCourseAccessAuthorizedStudent(user, course);
            case INSTRUCTOR -> isCourseAccessAuthorizedInstructor(user, course);
            case COORDINATOR -> isCourseAccessAuthorizedCoordinator(user, course);
            case UNDEFINED -> isCourseAccessAuthorizedUndefined(user, course);
        };
    }

    private boolean isCourseAccessAuthorizedCoordinator(User user, Course course) {
        return course.getCoordinator().getUser().equals(user);
    }

    private boolean isCourseAccessAuthorizedInstructor(User user, Course course) {
        return instructorRepository.findByUserIdAndCourseId(user.getId(), course.getId()).isPresent();
    }

    private boolean isCourseAccessAuthorizedStudent(User user, Course course) {
        return studentRepository.findByUserIdAndCourseIdAndAssignedToCourseGroup(user.getId(), course.getId()).isPresent();
    }

    private boolean isCourseAccessAuthorizedUndefined(User user, Course course) {
        return isCourseAccessAuthorizedStudent(user, course)
                || isCourseAccessAuthorizedInstructor(user, course)
                || isCourseAccessAuthorizedCoordinator(user, course);
    }
}
