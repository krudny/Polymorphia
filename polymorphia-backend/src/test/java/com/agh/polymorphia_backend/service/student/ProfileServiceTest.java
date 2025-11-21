package com.agh.polymorphia_backend.service.student;

import com.agh.polymorphia_backend.BaseTest;
import com.agh.polymorphia_backend.dto.response.profile.EvolutionStageThresholdResponseDto;
import com.agh.polymorphia_backend.dto.response.profile.ProfileResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFameEntry;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.model.user.student.Animal;
import com.agh.polymorphia_backend.model.user.student.EvolutionStage;
import com.agh.polymorphia_backend.model.user.student.Student;
import com.agh.polymorphia_backend.repository.course.EvolutionStagesRepository;
import com.agh.polymorphia_backend.repository.hall_of_fame.HallOfFameRepository;
import com.agh.polymorphia_backend.service.course.CourseService;
import com.agh.polymorphia_backend.service.hall_of_fame.HallOfFameService;
import com.agh.polymorphia_backend.service.mapper.ProfileMapper;
import com.agh.polymorphia_backend.service.user.UserService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class ProfileServiceTest extends BaseTest {

    @Mock
    private AccessAuthorizer accessAuthorizer;
    @Mock
    private CourseService courseService;
    @Mock
    private UserService userService;
    @Mock
    private HallOfFameService hallOfFameService;
    @Mock
    private AnimalService animalService;
    @Mock
    private HallOfFameRepository hallOfFameRepository;
    @Mock
    private EvolutionStagesRepository evolutionStagesRepository;
    @Mock
    private ProfileMapper profileMapper;

    @InjectMocks
    private ProfileService profileService;

    private User user;
    private Student student;
    private Course course;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        course = Course.builder()
                .id(1L)
                .build();

        user = User.builder()
                .id(1L)
                .preferredCourse(course)
                .build();
        student = Student.builder()
                .user(user)
                .build();

    }

    @Test
    void shouldReturnProfileResponseDto() {
        HallOfFameEntry hallOfFame = mock(HallOfFameEntry.class);
        when(hallOfFame.getTotalXpSum()).thenReturn(BigDecimal.valueOf(1234));
        when(hallOfFame.getEvolutionStage())
                .thenReturn("Stage 1")
                .thenReturn("Stage 2");

        Animal animal = Animal.builder()
                .id(5L)
                .build();

        EvolutionStage stage1 = EvolutionStage.builder()
                .id(1L)
                .orderIndex(1L)
                .build();

        EvolutionStage stage2 = EvolutionStage.builder()
                .id(2L)
                .orderIndex(2L)
                .build();

        EvolutionStageThresholdResponseDto stageDto1 = EvolutionStageThresholdResponseDto.builder()
                .name("Stage 1")
                .build();

        EvolutionStageThresholdResponseDto stageDto2 = EvolutionStageThresholdResponseDto.builder()
                .name("Stage 2")
                .build();

        Map<String, String> xpDetails = Map.of("Kartkówka", "2.0", "Laboratorium", "3.5");

        when(courseService.getCourseById(course.getId())).thenReturn(course);
        when(userService.getCurrentUser()).thenReturn(student);
        when(hallOfFameService.getStudentHallOfFame(animal)).thenReturn(hallOfFame);
        when(animalService.getAnimal(user.getId(), course.getId())).thenReturn(animal);
        when(hallOfFameService.groupScoreDetails(List.of(animal.getId())))
                .thenReturn(Map.of(animal.getId(), xpDetails));
        when(evolutionStagesRepository.findAllByCourseId(course.getId()))
                .thenReturn(List.of(stage2, stage1)); // unsorted on purpose
        when(profileMapper.toEvolutionStageThresholdResponseDto(stage1)).thenReturn(stageDto1);
        when(profileMapper.toEvolutionStageThresholdResponseDto(stage2)).thenReturn(stageDto2);
        when(hallOfFameRepository.countByCourseIdAndFilters(any())).thenReturn(42L);
        when(animalService.getAnimal(user.getId(), course.getId())).thenReturn(animal);

        ProfileResponseDto result = profileService.getProfile(course.getId());

        assertThat(result).isNotNull();
        assertThat(result.getTotalXp()).isEqualByComparingTo(BigDecimal.valueOf(1234));
        assertThat(result.getTotalStudentsInCourse()).isEqualTo(42);

        assertThat(result.getEvolutionStageThresholds()).containsExactly(stageDto1, stageDto2);

        assertThat(result.getLeftEvolutionStage()).isEqualTo(stageDto1);
        assertThat(result.getRightEvolutionStage()).isEqualTo(stageDto2);

        assertThat(result.getXpDetails()).isEqualTo(xpDetails);

        verify(accessAuthorizer).authorizeCourseAccess(course.getId());
        verify(hallOfFameService).updateXpDetails(eq(xpDetails), eq(hallOfFame));

        ProfileResponseDto result2 = profileService.getProfile(course.getId());
        assertThat(result2.getLeftEvolutionStage()).isEqualTo(stageDto1);
        assertThat(result2.getRightEvolutionStage()).isEqualTo(stageDto2);
    }
}
