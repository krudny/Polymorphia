package com.agh.polymorphia_backend.service.hall_of_fame;

import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFame;
import com.agh.polymorphia_backend.model.hall_of_fame.StudentScoreDetail;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.hall_of_fame.HallOfFameRepository;
import com.agh.polymorphia_backend.repository.hall_of_fame.StudentScoreDetailRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

class HallOfFameServiceTest {

    @Mock
    private HallOfFameRepository hallOfFameRepository;
    @Mock
    private StudentScoreDetailRepository studentScoreDetailRepository;

    @InjectMocks
    private HallOfFameService hallOfFameService;

    private User user;
    private HallOfFame hof;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        user = User.builder().id(1L).build();
        var course = Course.builder().id(10L).build();
        user.setPreferredCourse(course);

        hof = new HallOfFame();
    }

    @Test
    void shouldReturnStudentHallOfFame_WhenFound() {
        when(hallOfFameRepository.findByStudentIdAndCourseId(10L, 1L))
                .thenReturn(Optional.of(hof));

        HallOfFame result = hallOfFameService.getStudentHallOfFame(user);

        assertThat(result).isEqualTo(hof);
    }

    @Test
    void shouldThrowException_WhenHallOfFameNotFound() {
        when(hallOfFameRepository.findByStudentIdAndCourseId(10L, 1L))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> hallOfFameService.getStudentHallOfFame(user))
                .isInstanceOf(ResponseStatusException.class)
                .hasMessageContaining("Student's Hall of Fame scores not found");
    }

    @Test
    void shouldGroupScoreDetailsByAnimalId() {
        StudentScoreDetail detail1 = StudentScoreDetail.builder()
                .animalId(5L)
                .eventSectionName("Kartkówka")
                .rawXp(BigDecimal.valueOf(1.8))
                .build();
        StudentScoreDetail detail2 = StudentScoreDetail.builder()
                .animalId(5L)
                .eventSectionName("Laboratorium")
                .rawXp(BigDecimal.valueOf(2))
                .build();
        StudentScoreDetail detail3 = StudentScoreDetail.builder()
                .animalId(6L)
                .eventSectionName("Kartkówka")
                .rawXp(BigDecimal.valueOf(1))
                .build();
        StudentScoreDetail detail4 = StudentScoreDetail.builder()
                .animalId(6L)
                .eventSectionName("Kartkówka")
                .rawXp(BigDecimal.valueOf(2))
                .build();

        List<Long> animalIds=List.of(5L, 6L);
        List<StudentScoreDetail> details = List.of(detail1, detail2, detail3, detail4);
        Map<Long, Map<String, String>> expectedResult=Map.of(
                5L, Map.of("Kartkówka","1.80", "Laboratorium", "2.00"),
                6L, Map.of("Kartkówka","2.00")
        );

        when(studentScoreDetailRepository.findByAnimalIdIn(animalIds))
                .thenReturn(details);

        Map<Long, Map<String, String>> result = hallOfFameService.groupScoreDetails(animalIds);

        assertThat(result).isEqualTo(expectedResult);
    }
}
