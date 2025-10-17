package com.agh.polymorphia_backend.service.user;

import com.agh.polymorphia_backend.dto.response.user_context.AvailableCoursesResponseDto;
import com.agh.polymorphia_backend.dto.response.user_context.BaseUserDetailsResponseDto;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.user.*;
import com.agh.polymorphia_backend.repository.course.AnimalRepository;
import com.agh.polymorphia_backend.repository.course.StudentCourseGroupRepository;
import com.agh.polymorphia_backend.repository.user.UserCourseRoleRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import com.agh.polymorphia_backend.service.course.CourseService;
import com.agh.polymorphia_backend.service.mapper.UserContextMapper;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class UserContextServiceTest {

    @Mock
    private CourseService courseService;
    @Mock
    private AccessAuthorizer accessAuthorizer;
    @Mock
    private UserRepository userRepository;
    @Mock
    private UserService userService;
    @Mock
    private UserContextMapper userContextMapper;
    @Mock
    private UserCourseRoleRepository userCourseRoleRepository;
    @Mock
    private StudentCourseGroupRepository studentCourseGroupRepository;
    @Mock
    private AnimalRepository animalRepository;

    @InjectMocks
    private UserContextService userContextService;

    private User user;
    private Student student;
    private Course course;
    private UserCourseRole userCourseRole;
    private Animal animal;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = User.builder().id(1L).email("test@example.com").firstName("John").lastName("Doe").build();
        student = Student.builder().user(user).build();
        course = Course.builder().id(10L).build();

        UserCourseRoleId roleId = new UserCourseRoleId();
        roleId.setUserId(1L);
        roleId.setCourseId(10L);

        userCourseRole = UserCourseRole.builder()
                .id(roleId)
                .role(UserType.STUDENT)
                .course(course)
                .user(user)
                .build();

        animal = Animal.builder().id(1L).build();
    }

    @Test
    void getUserContext_shouldReturnMappedDto() {
        BaseUserDetailsResponseDto userDetails = BaseUserDetailsResponseDto.builder()
                .imageUrl("url")
                .fullName("user")
                .courseId(1L)
                .build();

        when(userService.getCurrentUser()).thenReturn(student);
        when(userService.getUserRole(student)).thenReturn(UserType.STUDENT);
        when(userContextMapper.toBaseUserDetailsResponseDto(student)).thenReturn(userDetails);

        var result = userContextService.getUserContext();

        assertEquals(UserType.STUDENT, result.getUserRole());
        assertEquals(userDetails, result.getUserDetails());
    }

    @Test
    void getUserRole_shouldReturnUserRole() {
        when(userService.getCurrentUser()).thenReturn(student);
        when(userService.getUserRole(student)).thenReturn(UserType.STUDENT);

        assertEquals(userContextService.getUserRole(), UserType.STUDENT);
    }


    @Test
    void setPreferredCourseId_shouldUpdatePreferredCourse() {
        when(courseService.getCourseById(10L)).thenReturn(course);
        when(accessAuthorizer.authorizePreferredCourseSwitch(course)).thenReturn(true);
        when(userService.getCurrentUser()).thenReturn(student);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        userContextService.setPreferredCourseId(10L);

        verify(userRepository).save(user);
        assertEquals(course, user.getPreferredCourse());
        verify(userService).updateSecurityCredentials(user);
    }

    @Test
    void setPreferredCourseId_shouldThrowWhenUserNotFound() {
        when(courseService.getCourseById(10L)).thenReturn(course);
        when(userService.getCurrentUser()).thenReturn(student);
        when(accessAuthorizer.authorizePreferredCourseSwitch(course)).thenReturn(true);
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(IllegalStateException.class,
                () -> userContextService.setPreferredCourseId(10L));
    }


//    @Test
//    void getAvailableCourses_shouldReturnAvailableCourses() {
//        AvailableCoursesResponseDto dto = AvailableCoursesResponseDto.builder()
//                .name("name")
//                .imageUrl("url")
//                .build();
//
//        when(userService.getCurrentUser()).thenReturn(student);
//        when(studentCourseGroupRepository.findAllCourseIdsByUserId(1L)).thenReturn(Set.of(10L));
//        when(userCourseRoleRepository.findAllByUserId(1L)).thenReturn(List.of(userCourseRole));
//        when(userContextMapper.toAvailableCoursesResponseDto(course, UserType.STUDENT)).thenReturn(dto);
//
//        var result = userContextService.getAvailableCourses();
//
//        assertEquals(1, result.size());
//        assertEquals(dto, result.getFirst());
//    }
}
