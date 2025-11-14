package com.agh.polymorphia_backend.service.user;

import com.agh.polymorphia_backend.BaseTest;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.user.*;
import com.agh.polymorphia_backend.model.user.student.Student;
import com.agh.polymorphia_backend.model.user.undefined.UndefinedUser;
import com.agh.polymorphia_backend.repository.user.UserCourseRoleRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import com.agh.polymorphia_backend.repository.user.role.StudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest extends BaseTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private UserCourseRoleRepository userCourseRoleRepository;

    @Mock
    private SecurityContext securityContext;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void loadUserByUsername_shouldReturnUndefinedUser_whenNoCourseRole() {
        String email = "test@example.com";
        User user = User.builder().id(1L).email(email).firstName("John").lastName("Doe").build();

        when(userCourseRoleRepository.findUserCourseRoleByEmail(email)).thenReturn(Optional.empty());
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        var result = userService.loadUserByUsername(email);

        assertInstanceOf(UndefinedUser.class, result);
        assertEquals(user, ((UndefinedUser) result).getUser());
    }

    @Test
    void loadUserByUsername_shouldThrow_whenNoUserFound() {
        String email = "missing@example.com";

        when(userCourseRoleRepository.findUserCourseRoleByEmail(email)).thenReturn(Optional.empty());
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> userService.loadUserByUsername(email));
    }

    @Test
    void loadUserByUsername_shouldReturnStudent_whenRoleStudent() {
        String email = "student@example.com";
        User user = User.builder().id(1L).email(email).firstName("John").build();
        Student student = Student.builder().user(user).build();
        UserCourseRole userCourseRole = UserCourseRole.builder()
                .id(new UserCourseRoleId(user.getId(), 100L))
                .user(user)
                .course(new Course())
                .role(UserType.STUDENT)
                .build();

        when(userCourseRoleRepository.findUserCourseRoleByEmail(email)).thenReturn(Optional.of(userCourseRole));
        when(studentRepository.findById(1L)).thenReturn(Optional.of(student));

        var result = userService.loadUserByUsername(email);

        assertSame(student, result);
    }

    @Test
    void getCurrentUser_shouldReturnPrincipalFromSecurityContext() {
        AbstractRoleUser roleUser = new Student();
        Authentication authentication = new UsernamePasswordAuthenticationToken(roleUser, null);

        when(securityContext.getAuthentication()).thenReturn(authentication);

        var result = userService.getCurrentUser();

        assertSame(roleUser, result);
    }

    @Test
    void getUserRole_shouldReturnSingleRole() {
        Student student = new Student();

        var result = userService.getUserRole(student);

        assertEquals(UserType.STUDENT, result);
    }

    @Test
    void getUserRole_shouldThrow_whenMultipleRoles() {
        Student student = mock(Student.class);
        doReturn(Set.of(UserType.STUDENT, UserType.INSTRUCTOR)).when(student).getAuthorities();

        assertThrows(IllegalStateException.class, () -> userService.getUserRole(student));
    }

    @Test
    void getFullName_shouldConcatenateFirstAndLastName() {
        User user = User.builder().firstName("Jane").lastName("Doe").build();

        var result = userService.getFullName(user);

        assertEquals("Jane Doe", result);
    }

    @Test
    void updateSecurityCredentials_shouldUpdateAuthentication() {
        User user = User.builder().id(1L).email("jane@example.com").build();
        Student reloadedUser = Student.builder().user(user).build();
        UserCourseRole userCourseRole = UserCourseRole.builder()
                .id(new UserCourseRoleId(user.getId(), 100L))
                .role(UserType.STUDENT)
                .user(user)
                .course(new Course())
                .build();

        when(userCourseRoleRepository.findUserCourseRoleByEmail(user.getEmail()))
                .thenReturn(Optional.of(userCourseRole));
        when(studentRepository.findById(user.getId())).thenReturn(Optional.of(reloadedUser));

        userService.updateSecurityCredentials(user);

        verify(securityContext).setAuthentication(any(Authentication.class));
    }
}
