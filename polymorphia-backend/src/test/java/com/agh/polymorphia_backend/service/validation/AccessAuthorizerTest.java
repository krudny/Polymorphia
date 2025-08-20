package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.user.*;
import com.agh.polymorphia_backend.repository.course.AnimalRepository;
import com.agh.polymorphia_backend.repository.course.CourseGroupRepository;
import com.agh.polymorphia_backend.repository.course.CourseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AccessAuthorizerTest {

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private CourseGroupRepository courseGroupRepository;

    @Mock
    private AnimalRepository animalRepository;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private AccessAuthorizer accessAuthorizer;

    private Course course;

    private static Stream<AccessAuthorizationScenario> scenariosProvider() {
        return Stream.of(
                new AccessAuthorizationScenario(10L, UserType.STUDENT, Student.class),
                new AccessAuthorizationScenario(10L, UserType.INSTRUCTOR, Instructor.class),
                new AccessAuthorizationScenario(10L, UserType.COORDINATOR, Coordinator.class)
        );
    }

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        SecurityContextHolder.setContext(securityContext);

        course = new Course();

        doReturn(authentication).when(securityContext).getAuthentication();
    }

    @ParameterizedTest
    @MethodSource("scenariosProvider")
    void authorizeCourseAccess_unauthorizedUser_throwsFrobidden(AccessAuthorizationScenario scenario) {
        when(authentication.getPrincipal()).thenReturn(scenario.user);
        doReturn(Optional.of(course)).when(courseRepository).findById(1L);

        switch (scenario.role) {
            case STUDENT -> doReturn(Optional.empty())
                    .when(animalRepository)
                    .findByCourseIdAndStudentId(1L, scenario.id);
            case INSTRUCTOR -> doReturn(Optional.empty())
                    .when(courseGroupRepository)
                    .findByCourseIdAndInstructorId(1L, scenario.id);
            case COORDINATOR -> course.setCoordinator(new Coordinator());
        }

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () ->
                accessAuthorizer.authorizeCourseAccess(1L));

        assertEquals(403, ex.getStatusCode().value());
        assertEquals(AccessAuthorizer.COURSE_UNAUTHORIZED, ex.getReason());
    }

    @ParameterizedTest
    @MethodSource("scenariosProvider")
    void authorizeCourseAccess_courseNotExist_throwsForbidden(AccessAuthorizationScenario scenario) {
        when(authentication.getPrincipal()).thenReturn(scenario.user);
        doReturn(Optional.empty()).when(courseRepository).findById(1L);

        switch (scenario.role) {
            case STUDENT -> doReturn(Optional.of(new Student()))
                    .when(animalRepository)
                    .findByCourseIdAndStudentId(1L, scenario.id);
            case INSTRUCTOR -> doReturn(Optional.of(new Instructor()))
                    .when(courseGroupRepository)
                    .findByCourseIdAndInstructorId(1L, scenario.id);
            case COORDINATOR -> course.setCoordinator((Coordinator) scenario.user);
        }

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () ->
                accessAuthorizer.authorizeCourseAccess(1L));

        assertEquals(403, ex.getStatusCode().value());
        assertEquals(AccessAuthorizer.COURSE_UNAUTHORIZED, ex.getReason());
    }


    @ParameterizedTest
    @MethodSource("scenariosProvider")
    void authorizeCourseAccess_authorizedUser_noException(AccessAuthorizationScenario scenario) {
        when(authentication.getPrincipal()).thenReturn(scenario.user);
        doReturn(Optional.of(course)).when(courseRepository).findById(1L);

        switch (scenario.role) {
            case STUDENT -> doReturn(Optional.of(new Student()))
                    .when(animalRepository)
                    .findByCourseIdAndStudentId(1L, scenario.id);
            case INSTRUCTOR -> doReturn(Optional.of(new Instructor()))
                    .when(courseGroupRepository)
                    .findByCourseIdAndInstructorId(1L, scenario.id);
            case COORDINATOR -> course.setCoordinator((Coordinator) scenario.user);
        }

        assertDoesNotThrow(() -> accessAuthorizer.authorizeCourseAccess(1L));
    }

    private static class AccessAuthorizationScenario {
        final User user;
        final Long id;
        final UserType role;

        AccessAuthorizationScenario(Long id, UserType role, Class<? extends User> clazz) {
            this.id = id;
            this.role = role;
            this.user = mock(clazz);
            doReturn(id).when(user).getId();
            doReturn(Set.of(role)).when(user).getAuthorities();
        }
    }
}
