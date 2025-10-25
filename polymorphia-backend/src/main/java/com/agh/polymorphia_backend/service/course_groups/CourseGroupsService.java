package com.agh.polymorphia_backend.service.course_groups;

import com.agh.polymorphia_backend.dto.response.course_groups.CourseGroupsResponseDto;
import com.agh.polymorphia_backend.dto.response.course_groups.CourseGroupsShortResponseDto;
import com.agh.polymorphia_backend.model.course.CourseGroup;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.course.CourseGroupRepository;
import com.agh.polymorphia_backend.service.mapper.CourseGroupsMapper;
import com.agh.polymorphia_backend.service.user.UserService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static com.agh.polymorphia_backend.service.user.UserService.INVALID_ROLE;

@Service
@AllArgsConstructor
public class CourseGroupsService {
    private final CourseGroupRepository courseGroupRepository;
    private final UserService userService;
    private final CourseGroupsMapper courseGroupsMapper;
    private final AccessAuthorizer accessAuthorizer;

    private List<CourseGroup> findAllCourseGroups(Long courseId) {
        accessAuthorizer.authorizeCourseAccess(courseId);
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
        accessAuthorizer.authorizeCourseAccess(courseId);
        Long userId = userService.getCurrentUser().getUser().getId();
        UserType userRole = userService.getCurrentUserRole();

        return switch (userRole) {
            case STUDENT -> courseGroupRepository.findByStudentIdAndCourseIdAndIsAssignedToCourseGroup(userId, courseId);
            case INSTRUCTOR -> courseGroupRepository.findByInstructorIdAndCourseId(userId, courseId);
            case COORDINATOR -> findAllCourseGroups(courseId);
            case UNDEFINED -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, INVALID_ROLE);
        };
    }
}
