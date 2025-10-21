package com.agh.polymorphia_backend.service.course;

import com.agh.polymorphia_backend.dto.response.course.CourseGroupsResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.course.CourseGroup;
import com.agh.polymorphia_backend.repository.course.CourseGroupRepository;
import com.agh.polymorphia_backend.repository.course.CourseRepository;
import com.agh.polymorphia_backend.repository.course.StudentCourseGroupRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CourseService {
    public static final String COURSE_NOT_FOUND = "Course does not exist or you're not authorized to access it";
    private final CourseRepository courseRepository;
    private final CourseGroupRepository courseGroupRepository;
    private final StudentCourseGroupRepository studentCourseGroupRepository;
    private final UserService userService;
    private final CourseMapper courseMapper;
    private final UserCourseRoleRepository userCourseRoleRepository;
    private final AccessAuthorizer accessAuthorizer;

    public Course getCourseById(Long courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, COURSE_NOT_FOUND));
    }

    public List<CourseGroupsResponseDto> getCourseGroups(Long courseId) {
        List<CourseGroup> courseGroups = courseGroupRepository.findByCourseId(courseId);

        return courseGroups.stream()
                .map(group -> {
                    Integer studentCount = studentCourseGroupRepository.countByCourseGroupId(group.getId());
                    return CourseGroupsResponseDto.builder()
                            .id(group.getId())
                            .name(group.getName())
                            .details("Details")
                            .studentCount(studentCount)
                            .build();
                })
                .collect(Collectors.toList());
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
