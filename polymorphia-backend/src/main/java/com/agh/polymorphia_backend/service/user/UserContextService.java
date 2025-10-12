package com.agh.polymorphia_backend.service.user;

import com.agh.polymorphia_backend.dto.response.user_context.AvailableCoursesResponseDto;
import com.agh.polymorphia_backend.dto.response.user_context.UserDetailsResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.user.AbstractRoleUser;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.model.user.UserCourseRole;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.user.UserCourseRoleRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import com.agh.polymorphia_backend.service.course.CourseService;
import com.agh.polymorphia_backend.service.mapper.UserContextMapper;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

import static com.agh.polymorphia_backend.service.user.UserService.USER_NOT_FOUND;

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
        AbstractRoleUser user = userService.getCurrentUser();
        return UserDetailsResponseDto.builder()
                .userRole(userService.getUserRole(user))
                .userDetails(userContextMapper.toBaseUserDetailsResponseDto(user))
                .build();
    }

    public UserType getUserRole() {
        AbstractRoleUser user = userService.getCurrentUser();
        return userService.getUserRole(user);
    }

    public void setPreferredCourseIfOneAvailable() {
        AbstractRoleUser user = userService.getCurrentUser();

        // TODO: w tym miejscu jezeli user ma prefered course a nie ma animala to dostanie redirect

        if (getUserRole() == UserType.UNDEFINED) {
            List<UserCourseRole> courses = userCourseRoleRepository.findAllByUserId(user.getUser().getId());
            if (courses.size() == 1) {
                setPreferredCourseId(courses.getFirst().getCourse().getId());
            }
        }
    }

    public void setPreferredCourseId(Long courseId) {
        Course course = courseService.getCourseById(courseId);

        if (!accessAuthorizer.authorizePreferredCourseSwitch(course)) {
            return;
        }


        User user = userService.getCurrentUser().getUser();
        User dbUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new IllegalStateException(USER_NOT_FOUND));

        dbUser.setPreferredCourse(course);
        userRepository.save(dbUser);
        userService.updateSecurityCredentials(user);
    }

    public List<AvailableCoursesResponseDto> getAvailableCourses() {
        User user = userService.getCurrentUser().getUser();
        return userCourseRoleRepository.findAllByUserId(user.getId()).stream()
                .map(userCourseRole ->
                        userContextMapper.toAvailableCoursesResponseDto(
                                courseService.getCourseById(userCourseRole.getCourse().getId()),
                                userCourseRole.getRole()
                        )
                )
                .sorted(Comparator.comparing(AvailableCoursesResponseDto::getId).reversed())
                .toList();
    }
}
