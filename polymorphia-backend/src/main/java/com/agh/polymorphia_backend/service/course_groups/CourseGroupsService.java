package com.agh.polymorphia_backend.service.course_groups;

import com.agh.polymorphia_backend.dto.response.course_groups.CourseGroupsResponseDto;
import com.agh.polymorphia_backend.dto.response.course_groups.CourseGroupsShortResponseDto;
import com.agh.polymorphia_backend.model.course.CourseGroup;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.course.CourseGroupRepository;
import com.agh.polymorphia_backend.service.mapper.CourseGroupsMapper;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class CourseGroupsService {
    private final static String INVALID_ROLE = "Invalid user role";
    private final CourseGroupRepository courseGroupRepository;
    private final UserService userService;
    private final CourseGroupsMapper courseGroupsMapper;

    public List<CourseGroup> findAllCourseGroups(Long courseId) {
        return courseGroupRepository.findByCourseId(courseId);
    }

    public List<CourseGroupsResponseDto> getAllCourseGroups(Long courseId) {
        List<CourseGroup> courseGroups = findAllCourseGroups(courseId);
        return courseGroups.stream()
                .map(courseGroupsMapper::toCourseGroupResponseDto)
                .toList();
    }

    public List<CourseGroupsShortResponseDto> getAllShortCourseGroups(Long courseId) {
        List<CourseGroup> courseGroups = findAllCourseGroups(courseId);
        return courseGroups.stream()
                .map(courseGroupsMapper::toCourseGroupShortResponseDto)
                .toList();
    }

    public List<CourseGroupsResponseDto> getIndividualCourseGroups(Long courseId) {
        return getCourseGroups(courseId).stream()
                .map(courseGroupsMapper::toCourseGroupResponseDto)
                .toList();
    }

    public List<CourseGroupsShortResponseDto> getIndividualShortCourseGroups(Long courseId) {
        return getCourseGroups(courseId).stream()
                .map(courseGroupsMapper::toCourseGroupShortResponseDto)
                .toList();
    }

    private List<CourseGroup> getCourseGroups(Long courseId) {
        Long userId = userService.getCurrentUser().getUser().getId();
        UserType userRole = userService.getCurrentUserRole();

        return switch (userRole) {
            case STUDENT -> getStudentCourseGroups(userId, courseId);
            case INSTRUCTOR -> getInstructorCourseGroups(userId, courseId);
            case COORDINATOR -> findAllCourseGroups(courseId);
            case UNDEFINED -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, INVALID_ROLE);
        };
    }

    private List<CourseGroup> getStudentCourseGroups(Long userId, Long courseId) {
        return courseGroupRepository.findByStudentIdAndCourseIdWhereAnimalExists(userId, courseId);

    }

    private List<CourseGroup> getInstructorCourseGroups(Long userId, Long courseId) {
        return courseGroupRepository.findByInstructorIdAndCourseId(userId, courseId);
    }

}
