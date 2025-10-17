package com.agh.polymorphia_backend.service.course;

import com.agh.polymorphia_backend.dto.response.user_context.AvailableCoursesResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.user.AbstractRoleUser;
import com.agh.polymorphia_backend.model.user.UserCourseRole;
import com.agh.polymorphia_backend.repository.course.CourseRepository;
import com.agh.polymorphia_backend.repository.user.UserCourseRoleRepository;
import com.agh.polymorphia_backend.service.mapper.CourseMapper;
import com.agh.polymorphia_backend.service.user.UserService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class CourseService {
    public static final String COURSE_NOT_FOUND = "Course does not exist or you're not authorized to access it";
    private final CourseRepository courseRepository;
    private final UserService userService;
    private final CourseMapper courseMapper;
    private final UserCourseRoleRepository userCourseRoleRepository;
    private final AccessAuthorizer accessAuthorizer;

    public Course getCourseById(Long courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, COURSE_NOT_FOUND));
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<AvailableCoursesResponseDto> getAvailableCourses() {
        AbstractRoleUser abstractRoleUser = userService.getCurrentUser();
        Long userId = abstractRoleUser.getUser().getId();
        List<Course> courses = getAllCourses();

        Map<Long, UserCourseRole> courseRoleMap = userCourseRoleRepository
                .findAllByUserId(userId)
                .stream()
                .collect(Collectors.toMap(
                        userCourseRole -> userCourseRole.getCourse().getId(),
                        userCourseRole -> userCourseRole
                ));

        return courses.stream()
                .filter(course -> accessAuthorizer.isCourseAccessAuthorized(abstractRoleUser, course))
                .filter(course -> courseRoleMap.containsKey(course.getId()))
                .map(course -> courseMapper.toAvailableCoursesResponseDto(
                        course,
                        courseRoleMap.get(course.getId()).getRole()
                ))
                .toList();

    }
}
