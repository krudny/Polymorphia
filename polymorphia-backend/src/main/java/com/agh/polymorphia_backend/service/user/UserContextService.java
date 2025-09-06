package com.agh.polymorphia_backend.service.user;

import com.agh.polymorphia_backend.dto.response.user_context.AvailableCoursesResponseDto;
import com.agh.polymorphia_backend.dto.response.user_context.UserDetailsResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.user.UserCourseRoleRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import com.agh.polymorphia_backend.service.course.CourseService;
import com.agh.polymorphia_backend.service.mapper.UserContextMapper;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserContextService {
    private final CourseService courseService;
    private final AccessAuthorizer accessAuthorizer;
    private final UserRepository userRepository;
    private final UserService userService;
    private final UserContextMapper userContextMapper;
    private final UserCourseRoleRepository userCourseRoleRepository;

    public UserDetailsResponseDto getUserContext() {
        User user = userService.getCurrentUser();
        return UserDetailsResponseDto.builder()
                .userType(userService.getUserRole(user))
                .userDetails(userContextMapper.toBaseUserDetailsResponseDto(user))
                .build();

    }

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
        accessAuthorizer.authorizePreferredCourseSwitch(course);

        User user = userService.getCurrentUser();
        User dbUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new IllegalStateException("User not found"));

        dbUser.setPreferredCourse(course);
        userRepository.save(dbUser);

        userService.updateSecurityCredentials(user);
    }

    public List<AvailableCoursesResponseDto> getAvailableCourses() {
        User user = userService.getCurrentUser();
        return userCourseRoleRepository.findAllByUserId(user.getId()).stream()
                .map(userCourseRole ->
                        userContextMapper.toAvailableCoursesResponseDto(
                                courseService.getCourseById(userCourseRole.getId()),
                                userCourseRole.getRole()
                        )
                )
                .toList();
    }


    private Course savePreferredCourse(User user, List<AvailableCoursesResponseDto> availableCourses) {
        Course preferredCourse = courseService.getCourseById(availableCourses.getFirst().getId());

        user.setPreferredCourse(preferredCourse);
        userRepository.save(user);

        return preferredCourse;
    }
}
