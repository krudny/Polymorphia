package com.agh.polymorphia_backend.service.course;

import com.agh.polymorphia_backend.dto.request.HallOfFameRequestDto;
import com.agh.polymorphia_backend.dto.response.profile.EvolutionStageThresholdResponseDto;
import com.agh.polymorphia_backend.dto.response.profile.ProfileResponseDto;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.course.EvolutionStage;
import com.agh.polymorphia_backend.model.hall_of_fame.SearchBy;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.course.EvolutionStagesRepository;
import com.agh.polymorphia_backend.repository.hall_of_fame.HallOfFameRepository;
import com.agh.polymorphia_backend.service.hall_of_fame.HallOfFameService;
import com.agh.polymorphia_backend.service.mapper.ProfileMapper;
import com.agh.polymorphia_backend.service.user.UserService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import com.agh.polymorphia_backend.util.NumberFormatter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class ProfileService {

    private final AccessAuthorizer accessAuthorizer;
    private final CourseService courseService;
    private final UserService userService;
    private final HallOfFameService hallOfFameService;
    private final AnimalService animalService;
    private final HallOfFameRepository hallOfFameRepository;
    private final EvolutionStagesRepository evolutionStagesRepository;
    private final ProfileMapper profileMapper;

    public ProfileResponseDto getProfile(Long courseId) {
        Course course = courseService.getCourseById(courseId);
        accessAuthorizer.authorizeCourseAccess(course);
        User user = userService.getCurrentUser().getUser();

        Animal animal = animalService.getAnimal(user.getId(), courseId);
        Map<String, String> xpDetails = hallOfFameService.groupScoreDetails(List.of(animal.getId())).get(animal.getId());
        BigDecimal totalXp = hallOfFameService.getStudentHallOfFame(user).getTotalXpSum();

        return ProfileResponseDto.builder()
                .evolutionStageThresholds(getEvolutionStages(courseId))
                .totalXp(NumberFormatter.formatToBigDecimal(totalXp))
                .totalStudentsInCourse(getTotalStudentsInCourse(courseId))
                .xpDetails(xpDetails)
                .build();
    }

    private Long getTotalStudentsInCourse(Long courseId) {
        HallOfFameRequestDto request = HallOfFameRequestDto.builder().courseId(courseId).groups(Collections.emptyList()).searchBy(SearchBy.ANIMAL_NAME).searchTerm("").build();

        return hallOfFameRepository.countByCourseIdAndFilters(request);
    }

    private List<EvolutionStageThresholdResponseDto> getEvolutionStages(Long courseId) {
        List<EvolutionStage> evolutionStages = evolutionStagesRepository.findAllByCourseId(courseId);
        return evolutionStages.stream()
                .sorted(Comparator.comparing(EvolutionStage::getOrderIndex))
                .map(profileMapper::toEvolutionStageThresholdResponseDto)
                .toList();
    }
}
