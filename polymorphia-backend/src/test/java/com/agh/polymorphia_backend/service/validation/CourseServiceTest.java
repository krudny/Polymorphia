package com.agh.polymorphia_backend.service.validation;


import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.repository.course.CourseGroupRepository;
import com.agh.polymorphia_backend.repository.course.CourseRepository;
import com.agh.polymorphia_backend.repository.course.StudentCourseGroupRepository;
import com.agh.polymorphia_backend.repository.user.UserCourseRoleRepository;
import com.agh.polymorphia_backend.service.course.CourseService;
import com.agh.polymorphia_backend.service.mapper.CourseMapper;
import com.agh.polymorphia_backend.service.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static com.agh.polymorphia_backend.service.course.CourseService.COURSE_NOT_FOUND;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ActiveProfiles("test")
public class CourseServiceTest {
    private static final Long COURSE_ID = 99L;
    private static CourseService service;
    @Mock
    private CourseRepository courseRepository;

    @Mock
    private UserService userService;

    @Mock
    private CourseMapper courseMapper;

    @Mock
    private UserCourseRoleRepository userCourseRoleRepository;

    @Mock
    private AccessAuthorizer accessAuthorizer;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        service = new CourseService(
                courseRepository,
                userService,
                courseMapper,
                userCourseRoleRepository,
                accessAuthorizer
        );
    }

    @Test
    public void getCourse_shouldThrow_whenCourseNotFound() {
        when(courseRepository.findById(COURSE_ID)).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(
                ResponseStatusException.class,
                () -> service.getCourseById(COURSE_ID)
        );

        assertEquals(404, ex.getStatusCode().value());
        assertEquals(COURSE_NOT_FOUND, ex.getReason());
    }

    @Test
    public void getCourse_shouldNotThrow_whenCourseFound() {
        Course course = new Course();
        when(courseRepository.findById(COURSE_ID)).thenReturn(Optional.of(course));

        Course result = assertDoesNotThrow(() -> service.getCourseById(COURSE_ID));
        assertEquals(course, result);

    }
}
