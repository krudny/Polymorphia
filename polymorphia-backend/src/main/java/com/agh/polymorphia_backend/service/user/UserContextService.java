package com.agh.polymorphia_backend.service.user;

import com.agh.polymorphia_backend.dto.response.user_context.AvailableCoursesResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.course.CourseRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import com.agh.polymorphia_backend.service.course.CourseService;
import com.agh.polymorphia_backend.service.mapper.UserContextMapper;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class UserContextService {
    private final CourseService courseService;
    private final AccessAuthorizer accessAuthorizer;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final UserService userService;
    private final UserContextMapper userContextMapper;
    private final Map<UserType, String> roles = Map.of(
            UserType.COORDINATOR, "Koordynator",
            UserType.STUDENT, "Student",
            UserType.INSTRUCTOR, "Prowadzący"
    );

    public boolean isPreferredCourseSet() {
        User user = userService.getCurrentUser();
        Course preferredCourse = user.getPreferredCourse();

        if (preferredCourse == null) {
            List<AvailableCoursesResponseDto> availableCourses = getAvailableCourses();
            if (availableCourses.size() == 1) {
                preferredCourse = savePreferredCourse(user, availableCourses);
            }
        }

        return preferredCourse != null;
    }

    public void setPreferredCourseId(Long courseId) {
        Course course = courseService.getCourseById(courseId);
        accessAuthorizer.authorizeCourseAccess(course);

        User user = userService.getCurrentUser();
        user.setPreferredCourse(course);

        userRepository.save(user);
    }

    public List<AvailableCoursesResponseDto> getAvailableCourses() {
        User user = userService.getCurrentUser();

        return accessAuthorizer.getUserRoles(user).stream()
                .flatMap(role -> getCoursesByRole(user.getId(), role).stream())
                .toList();
    }

    private List<AvailableCoursesResponseDto> getCoursesByRole(Long userId, UserType userType) {
        List<Course> courses;

        switch (userType) {
            case COORDINATOR -> courses = courseRepository.findByCoordinatorId(userId);
            case INSTRUCTOR -> courses = courseRepository.findByInstructorId(userId);
            case STUDENT -> courses = courseRepository.findByStudentId(userId);
            default -> throw new IllegalArgumentException("Unknown user type: " + userType);
        }

        String roleName = roles.get(userType);
        return courses.stream()
                .map(course -> userContextMapper.toAvailableCoursesResponseDto(course, roleName))
                .toList();
    }

    private Course savePreferredCourse(User user, List<AvailableCoursesResponseDto> availableCourses) {
        Course preferredCourse = courseRepository.findById(availableCourses.getFirst().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR));

        user.setPreferredCourse(preferredCourse);
        userRepository.save(user);

        return preferredCourse;
    }
}
