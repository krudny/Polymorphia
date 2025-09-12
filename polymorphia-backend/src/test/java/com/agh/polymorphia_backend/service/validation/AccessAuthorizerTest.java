package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.user.*;
import com.agh.polymorphia_backend.repository.user.role.InstructorRepository;
import com.agh.polymorphia_backend.repository.user.role.StudentRepository;
import com.agh.polymorphia_backend.service.user.UserService;
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

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static com.agh.polymorphia_backend.service.course.CourseService.COURSE_NOT_FOUND;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AccessAuthorizerTest {


    @Mock
    private UserService userService;

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private InstructorRepository instructorRepository;

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
        doReturn(scenario.user).when(userService).getCurrentUser();
        doReturn(scenario.role).when(userService).getUserRole(scenario.user);

        switch (scenario.role) {
            case STUDENT -> doReturn(Optional.empty())
                    .when(studentRepository)
                    .findByUserIdAndCourseId(scenario.id, 1L);
            case INSTRUCTOR -> doReturn(Optional.empty())
                    .when(instructorRepository)
                    .findByUserIdAndCourseId(scenario.id, 1L);
            case COORDINATOR -> doReturn(Coordinator.builder().user(new User()).build())
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
        when(userService.getCurrentUser()).thenReturn(scenario.user);
        doReturn(scenario.role).when(userService).getUserRole(scenario.user);

        switch (scenario.role) {
            case STUDENT -> doReturn(Optional.of(new Student()))
                    .when(studentRepository)
                    .findByUserIdAndCourseId(scenario.id, 1L);
            case INSTRUCTOR -> doReturn(Optional.of(new Instructor()))
                    .when(instructorRepository)
                    .findByUserIdAndCourseId(scenario.id, 1L);
            case COORDINATOR -> doReturn(scenario.user)
                    .when(course).getCoordinator();

        }

        assertDoesNotThrow(() -> accessAuthorizer.authorizeCourseAccess(course));
    }

    @ParameterizedTest
    @MethodSource("scenariosProvider")
    void authorizePreferredCourseSwitch_authorizedUser_noException(AccessAuthorizationScenario scenario) {
        when(userService.getCurrentUser()).thenReturn(scenario.user);
        doReturn(scenario.role).when(userService).getUserRole(scenario.user);

        switch (scenario.role) {
            case STUDENT -> doReturn(Optional.of(new Student()))
                    .when(studentRepository)
                    .findByUserIdAndCourseId(scenario.id, 1L);
            case INSTRUCTOR -> doReturn(Optional.of(new Instructor()))
                    .when(instructorRepository)
                    .findByUserIdAndCourseId(scenario.id, 1L);
            case COORDINATOR -> doReturn(scenario.user)
                    .when(course).getCoordinator();
        }

        assertDoesNotThrow(() -> accessAuthorizer.authorizePreferredCourseSwitch(course));
    }

    @ParameterizedTest
    @MethodSource("scenariosProvider")
    void authorizePreferredCourseSwitch_unauthorizedUser_throwsNotFound(AccessAuthorizationScenario scenario) {
        when(userService.getCurrentUser()).thenReturn(scenario.user);
        doReturn(scenario.role).when(userService).getUserRole(scenario.user);

        doReturn(Coordinator.builder().user(new User()).build())
                .when(course).getCoordinator();

        doReturn(Optional.empty())
                .when(studentRepository)
                .findByUserIdAndCourseId(scenario.id, 1L);

        doReturn(Optional.empty())
                .when(instructorRepository)
                .findByUserIdAndCourseId(scenario.id, 1L);

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () ->
                accessAuthorizer.authorizePreferredCourseSwitch(course));

        assertEquals(404, ex.getStatusCode().value());
        assertEquals(COURSE_NOT_FOUND, ex.getReason());
    }


    @Test
    void hasAnyRole_returnsTrue_whenUserHasRole() {
        Instructor user = mock(Instructor.class);
        when(userService.getCurrentUser()).thenReturn(user);
        doReturn(UserType.INSTRUCTOR).when(userService).getUserRole(user);

        boolean result = accessAuthorizer.hasAnyRole(List.of(UserType.INSTRUCTOR));

        assertTrue(result);
    }

    @Test
    void hasAnyRole_returnsFalse_whenUserDoesNotHaveRole() {
        Student user = mock(Student.class);
        when(userService.getCurrentUser()).thenReturn(user);
        doReturn(UserType.STUDENT).when(userService).getUserRole(user);

        boolean result = accessAuthorizer.hasAnyRole(java.util.List.of(UserType.INSTRUCTOR));

        assertFalse(result);
    }


    private static class AccessAuthorizationScenario {
        final AbstractRoleUser user;
        final Long id;
        final UserType role;

        AccessAuthorizationScenario(Long id, UserType role, Class<? extends AbstractRoleUser> clazz) {
            this.id = id;
            this.role = role;
            this.user = mock(clazz);
            User mainUser = mock(User.class);
            doReturn(id).when(mainUser).getId();
            doReturn(mainUser).when(user).getUser();

        }
    }
}
