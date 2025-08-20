package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.course.AnimalRepository;
import com.agh.polymorphia_backend.repository.course.CourseGroupRepository;
import com.agh.polymorphia_backend.repository.course.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AccessAuthorizer {
    public static final String COURSE_UNAUTHORIZED = "Unauthorized course access";
    private final CourseRepository courseRepository;
    private final CourseGroupRepository courseGroupRepository;
    private final AnimalRepository animalRepository;

    public void authorizeCourseAccess(Long courseId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        if (authorizeStudentCourseAccess(user, courseId)
                || authorizeCoordinatorCourseAccess(user, courseId)
                || authorizeInstructorCourseAccess(user, courseId)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    COURSE_UNAUTHORIZED
            );
        }
    }

    private boolean authorizeCoordinatorCourseAccess(User user, Long courseId) {
        Optional<Course> course = courseRepository.findById(courseId);
        return course.isEmpty() || (user.getAuthorities().contains(UserType.COORDINATOR)
                && !course.get().getCoordinator().equals(user));
    }

    private boolean authorizeInstructorCourseAccess(User user, Long courseId) {
        return user.getAuthorities().contains(UserType.INSTRUCTOR)
                && courseGroupRepository.findByCourseIdAndInstructorId(courseId, user.getId()).isEmpty();
    }

    private boolean authorizeStudentCourseAccess(User user, Long courseId) {
        return user.getAuthorities().contains(UserType.STUDENT)
                && animalRepository.findByCourseIdAndStudentId(courseId, user.getId()).isEmpty();
    }
}
