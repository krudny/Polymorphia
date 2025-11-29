package com.agh.polymorphia_backend.service.course_groups;

import com.agh.polymorphia_backend.dto.request.course_group.CreateCourseGroupRequestDto;
import com.agh.polymorphia_backend.dto.response.course_groups.CourseGroupsResponseDto;
import com.agh.polymorphia_backend.dto.response.course_groups.CourseGroupsShortResponseDto;
import com.agh.polymorphia_backend.dto.response.user.TeachingRoleUserResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.course.CourseGroup;
import com.agh.polymorphia_backend.model.user.TeachingRoleUser;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.course.CourseGroupRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import com.agh.polymorphia_backend.service.course.CourseService;
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
    private final AccessAuthorizer accessAuthorizer;
    private final CourseGroupsMapper courseGroupsMapper;
    private final CourseService courseService;
    private final UserRepository userRepository;

    public List<String> findAllCourseGroupNames(Long courseId) {
        accessAuthorizer.authorizeCourseAccess(courseId);
        return courseGroupRepository.findNamesByCourseId(courseId);
    }

    public List<CourseGroupsResponseDto> getAllCourseGroups(Long courseId) {
        accessAuthorizer.authorizeCourseAccess(courseId);
        return findCourseGroups(courseId, null, null);
    }

    public List<CourseGroupsShortResponseDto> getAllShortCourseGroups(Long courseId) {
        accessAuthorizer.authorizeCourseAccess(courseId);
        return findShortCourseGroups(courseId, null, null);
    }

    public List<CourseGroupsResponseDto> getIndividualCourseGroups(Long courseId) {
        return getCourseGroups(courseId);
    }

    public List<CourseGroupsShortResponseDto> getIndividualShortCourseGroups(Long courseId) {
        return getShortCourseGroups(courseId);
    }

    public CourseGroup findCourseGroupForTeachingRoleUser(Long courseGroupId) {
        return switch (userService.getCurrentUserRole()) {
            case INSTRUCTOR, COORDINATOR -> courseGroupRepository.findCourseGroupForTeachingRoleUser(courseGroupId,
                userService.getCurrentUser().getUserId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nie znaleziono grupy zajęciowej."));
            default -> throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Brak uprawnień.");
        };
    }

    public void createCourseGroup(CreateCourseGroupRequestDto requestDto) {
        accessAuthorizer.authorizeCourseAccess(requestDto.getCourseId());

        Course course = courseService.getCourseById(requestDto.getCourseId());
        TeachingRoleUser teachingRoleUser = userService.getTeachingRoleUser(requestDto.getTeachingRoleId(), requestDto.getCourseId());

        CourseGroup courseGroup = CourseGroup.builder()
                .name(requestDto.getName())
                .room(requestDto.getRoom())
                .course(course)
                .teachingRoleUser(teachingRoleUser)
                .studentCourseGroupAssignments(List.of())
                .build();

        try {
            courseGroupRepository.save(courseGroup);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Nie udało się utworzyć grupy zajęciowej.");
        }

    }

    public List<TeachingRoleUserResponseDto> getTeachingRoleUsers(Long courseId) {
        accessAuthorizer.authorizeCourseAccess(courseId);

        List<User> users = userRepository.findAllTeachingRoleUsers();

        return users.stream()
                .map(user -> TeachingRoleUserResponseDto.builder()
                .userId(user.getId())
                .fullName(userService.getFullName(user))
                .build())
                .toList();
    }

    private List<CourseGroupsResponseDto> getCourseGroups(Long courseId) {
        accessAuthorizer.authorizeCourseAccess(courseId);
        Long userId = userService.getCurrentUser().getUser().getId();
        UserType userRole = userService.getCurrentUserRole();

        return switch (userRole) {
            case STUDENT -> findCourseGroups(courseId, userId, null);
            case INSTRUCTOR, COORDINATOR -> findCourseGroups(courseId, null, userId);
            case UNDEFINED -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, INVALID_ROLE);
        };
    }

    private List<CourseGroupsShortResponseDto> getShortCourseGroups(Long courseId) {
        accessAuthorizer.authorizeCourseAccess(courseId);
        Long userId = userService.getCurrentUser().getUser().getId();
        UserType userRole = userService.getCurrentUserRole();

        return switch (userRole) {
            case STUDENT -> findShortCourseGroups(courseId, userId, null);
            case INSTRUCTOR, COORDINATOR -> findShortCourseGroups(courseId, null, userId);
            case UNDEFINED -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, INVALID_ROLE);
        };
    }

    private List<CourseGroupsResponseDto> findCourseGroups(Long courseId, Long userId, Long teachingRoleUserId) {
        return courseGroupRepository.findCourseGroups(courseId, userId, teachingRoleUserId).stream()
            .map(courseGroupsMapper::toCourseGroupResponseDto).toList();
    }

    private List<CourseGroupsShortResponseDto> findShortCourseGroups(Long courseId, Long userId,
        Long teachingRoleUserId) {
        return courseGroupRepository.findShortCourseGroups(courseId, userId, teachingRoleUserId).stream()
            .map(courseGroupsMapper::toCourseGroupShortResponseDto).toList();
    }
}
