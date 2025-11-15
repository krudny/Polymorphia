package com.agh.polymorphia_backend.service.hall_of_fame;

import com.agh.polymorphia_backend.BaseTest;
import com.agh.polymorphia_backend.model.user.student.Animal;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.event_section.AssignmentSection;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFameEntry;
import com.agh.polymorphia_backend.model.hall_of_fame.StudentScoreDetail;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.event_section.EventSectionRepository;
import com.agh.polymorphia_backend.repository.hall_of_fame.HallOfFameRepository;
import com.agh.polymorphia_backend.repository.hall_of_fame.StudentScoreDetailRepository;
import com.agh.polymorphia_backend.service.student.AnimalService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

class HallOfFameServiceTest extends BaseTest {

    @Mock
    private HallOfFameRepository hallOfFameRepository;
    @Mock
    private StudentScoreDetailRepository studentScoreDetailRepository;
    @Mock
    private EventSectionRepository eventSectionRepository;
    @Mock
    private AnimalService animalService;

    @InjectMocks
    private HallOfFameService hallOfFameService;

    private User user;
    private HallOfFameEntry hof;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        user = User.builder().id(1L).build();
        var course = Course.builder().id(10L).build();
        user.setPreferredCourse(course);

        hof = new HallOfFameEntry();
    }

    @Test
    void shouldReturnStudentHallOfFame_WhenFound() {
        Animal animal = Animal.builder().id(10L).build();
        when(animalService.getAnimal(1L, 10L)).thenReturn(animal);
        when(hallOfFameRepository.findByAnimalId(10L))
                .thenReturn(Optional.of(hof));

        HallOfFameEntry result = hallOfFameService.getStudentHallOfFame(animal);

        assertThat(result).isEqualTo(hof);
    }

    @Test
    void shouldThrowException_WhenHallOfFameNotFound() {
        Animal animal = Animal.builder().id(10L).build();
        when(animalService.getAnimal(1L, 10L)).thenReturn(animal);
        when(hallOfFameRepository.findByAnimalId(10L))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> hallOfFameService.getStudentHallOfFame(animal))
                .isInstanceOf(ResponseStatusException.class)
                .hasMessageContaining("Brak wyników studenta w Hall of Fame");
    }

    @Test
    void shouldGroupScoreDetailsByAnimalId() {
        StudentScoreDetail detail1 = StudentScoreDetail.builder()
                .animalId(5L)
                .eventSectionId(2L)
                .eventSectionName("Kartkówka")
                .rawXp(BigDecimal.valueOf(1.8))
                .build();
        StudentScoreDetail detail2 = StudentScoreDetail.builder()
                .animalId(5L)
                .eventSectionId(1L)
                .eventSectionName("Laboratorium")
                .rawXp(BigDecimal.valueOf(2))
                .build();
        StudentScoreDetail detail3 = StudentScoreDetail.builder()
                .animalId(6L)
                .eventSectionId(2L)
                .eventSectionName("Kartkówka")
                .rawXp(BigDecimal.valueOf(1))
                .build();
        StudentScoreDetail detail4 = StudentScoreDetail.builder()
                .animalId(6L)
                .eventSectionId(2L)
                .eventSectionName("Kartkówka")
                .rawXp(BigDecimal.valueOf(2))
                .build();

        List<Long> animalIds = List.of(5L, 6L);
        List<StudentScoreDetail> details = Arrays.asList(detail1, detail2, detail3, detail4);
        Map<Long, Map<String, String>> expectedResult = Map.of(
                5L, Map.of("Kartkówka", "1.8", "Laboratorium", "2.0"),
                6L, Map.of("Kartkówka", "2.0")
        );
        AssignmentSection section1 = AssignmentSection.builder()
                .id(1L)
                .name("Laboratorium")
                .orderIndex(2L)
                .build();
        AssignmentSection section2 = AssignmentSection.builder()
                .id(2L)
                .name("Kartkówka")
                .orderIndex(1L)
                .build();

        when(studentScoreDetailRepository.findByAnimalIdIn(animalIds))
                .thenReturn(details);
        when(eventSectionRepository.findByIdIn(Set.of(1L, 2L)))
                .thenReturn(new ArrayList<>(Arrays.asList(section1, section2)));

        Map<Long, Map<String, String>> result = hallOfFameService.groupScoreDetails(animalIds);

        assertThat(result).isEqualTo(expectedResult);
    }
}
