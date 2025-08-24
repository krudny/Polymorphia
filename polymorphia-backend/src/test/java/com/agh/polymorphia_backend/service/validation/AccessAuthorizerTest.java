package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.user.*;
import com.agh.polymorphia_backend.repository.course.AnimalRepository;
import com.agh.polymorphia_backend.repository.course.CourseGroupRepository;
import com.agh.polymorphia_backend.repository.course.CourseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Stream;

import static com.agh.polymorphia_backend.service.course.CourseService.COURSE_NOT_FOUND;
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

    @Mock
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

        doReturn(1L).when(course).getId();

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
            case COORDINATOR -> doReturn(new Coordinator())
                    .when(course).getCoordinator();
        }

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () ->
                accessAuthorizer.authorizeCourseAccess(course));

        assertEquals(404, ex.getStatusCode().value());
        assertEquals(COURSE_NOT_FOUND, ex.getReason());
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
            case COORDINATOR -> doReturn(scenario.user)
                    .when(course).getCoordinator();
        }

        assertDoesNotThrow(() -> accessAuthorizer.authorizeCourseAccess(course));
    }


    @Test
    void authorizeCourseAccess_userWithNoRoles_throwsIllegalState() {
        User user = mock(User.class);
        when(user.getAuthorities()).thenReturn(Collections.emptySet()); // no roles
        when(authentication.getPrincipal()).thenReturn(user);

        IllegalStateException ex = assertThrows(IllegalStateException.class,
                () -> accessAuthorizer.authorizeCourseAccess(course));

        assertEquals(AccessAuthorizer.USER_HAS_NO_VALID_ROLES, ex.getMessage());
    }

    @Test
    void hasAnyRole_returnsTrue_whenUserHasRole() {
        User user = mock(User.class);
        when(authentication.getPrincipal()).thenReturn(user);
        doReturn(Set.of(UserType.INSTRUCTOR, UserType.STUDENT)).when(user).getAuthorities();

        boolean result = accessAuthorizer.hasAnyRole(List.of(UserType.INSTRUCTOR));

        assertTrue(result);
    }

    @Test
    void hasAnyRole_returnsFalse_whenUserDoesNotHaveRole() {
        User user = mock(User.class);
        when(authentication.getPrincipal()).thenReturn(user);
        doReturn(Set.of(UserType.STUDENT)).when(user).getAuthorities();

        boolean result = accessAuthorizer.hasAnyRole(java.util.List.of(UserType.INSTRUCTOR));

        assertFalse(result);
    }

    @Test
    void hasAnyRole_throwsIllegalState_whenUserHasNoRoles() {
        User user = mock(User.class);
        when(user.getAuthorities()).thenReturn(Collections.emptySet());
        when(authentication.getPrincipal()).thenReturn(user);

        IllegalStateException ex = assertThrows(IllegalStateException.class,
                () -> accessAuthorizer.hasAnyRole(List.of(UserType.STUDENT)));

        assertEquals(AccessAuthorizer.USER_HAS_NO_VALID_ROLES, ex.getMessage());
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
