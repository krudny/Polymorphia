package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.course.AnimalRepository;
import com.agh.polymorphia_backend.repository.course.CourseGroupRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final CourseGroupRepository courseGroupRepository;
    private final AnimalRepository animalRepository;

    public void authorizeCourseAccess(Course course) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        if (!isCourseAccessAuthorized(user, course)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    COURSE_NOT_FOUND
            );
        }
    }

    public boolean hasAnyRole(List<UserType> roles) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        return getUserRoles(user).stream().anyMatch(roles::contains);
    }

    private Set<UserType> getUserRoles(User user) {
        Set<UserType> roles = user.getAuthorities().stream()
                .map(a -> UserType.valueOf(a.getAuthority()))
                .collect(Collectors.toSet());

        if (roles.isEmpty()) {
            throw new IllegalStateException(USER_HAS_NO_VALID_ROLES);
        }

        return roles;
    }

    private boolean isCourseAccessAuthorized(User user, Course course) {
        Set<UserType> roles = getUserRoles(user);
        boolean authorized = false;

        for (UserType role : roles) {
            switch (role) {
                case STUDENT -> authorized = isCourseAccessAuthorizedStudent(user, course);
                case INSTRUCTOR -> authorized = isCourseAccessAuthorizedInstructor(user, course);
                case COORDINATOR -> authorized = isCourseAccessAuthorizedCoordinator(user, course);
            }

            if (authorized) {
                break;
            }
        }

        return authorized;
    }

    private boolean isCourseAccessAuthorizedCoordinator(User user, Course course) {
        return course.getCoordinator().equals(user);
    }

    private boolean isCourseAccessAuthorizedInstructor(User user, Course course) {
        return courseGroupRepository.findByCourseIdAndInstructorId(course.getId(), user.getId()).isPresent();
    }

    private boolean isCourseAccessAuthorizedStudent(User user, Course course) {
        return animalRepository.findByCourseIdAndStudentId(course.getId(), user.getId()).isPresent();
    }
}
