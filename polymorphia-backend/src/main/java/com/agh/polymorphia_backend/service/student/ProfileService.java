package com.agh.polymorphia_backend.service.student;

import com.agh.polymorphia_backend.dto.request.hall_of_fame.HallOfFameRequestDto;
import com.agh.polymorphia_backend.dto.request.notification.NotificationCreationRequest;
import com.agh.polymorphia_backend.dto.response.profile.EvolutionStageThresholdResponseDto;
import com.agh.polymorphia_backend.dto.response.profile.ProfileResponseDto;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.course.EvolutionStage;
import com.agh.polymorphia_backend.model.hall_of_fame.SearchBy;
import com.agh.polymorphia_backend.model.notification.NotificationType;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.course.EvolutionStagesRepository;
import com.agh.polymorphia_backend.repository.hall_of_fame.HallOfFameRepository;
import com.agh.polymorphia_backend.service.course.CourseService;
import com.agh.polymorphia_backend.service.gradable_event.GradableEventService;
import com.agh.polymorphia_backend.service.hall_of_fame.HallOfFameService;
import com.agh.polymorphia_backend.service.mapper.ProfileMapper;
import com.agh.polymorphia_backend.service.notification.NotificationDispatcher;
import com.agh.polymorphia_backend.service.notification.NotificationService;
import com.agh.polymorphia_backend.service.user.UserService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import com.agh.polymorphia_backend.util.NumberFormatter;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.*;

import static com.agh.polymorphia_backend.service.hall_of_fame.HallOfFameService.STUDENT_HOF_NOT_FOUND;

@Service
@AllArgsConstructor
public class ProfileService {
    private static final String PROFILE_INFO_INCOMPLETE = "Profile info incomplete: %s";
    private static final String LACKING_EVOLUTION_STAGES = "Evolution stages not defined";
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

        BigDecimal totalXp = hallOfFameService.getStudentHallOfFame(user).getTotalXpSum();
        List<EvolutionStageThresholdResponseDto> evolutionStages = getEvolutionStages(courseId);
        int evolutionStageId = getCurrentEvolutionStageId(evolutionStages, user);

        return ProfileResponseDto.builder()
                .evolutionStageThresholds(evolutionStages)
                .leftEvolutionStage(getLeftEvolutionStage(evolutionStages, evolutionStageId))
                .rightEvolutionStage(getRightEvolutionStage(evolutionStages, evolutionStageId))
                .totalXp(NumberFormatter.formatToBigDecimal(totalXp))
                .totalStudentsInCourse(getTotalStudentsInCourse(courseId))
                .xpDetails(getXpDetails(user, courseId))
                .build();
    }

    private Map<String, String> getXpDetails(User user, Long courseId) {
        Animal animal = animalService.getAnimal(user.getId(), courseId);
        Map<String, String> xpDetails = hallOfFameService.groupScoreDetails(List.of(animal.getId())).get(animal.getId());

        if (xpDetails.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_HOF_NOT_FOUND);
        }

        hallOfFameService.updateXpDetails(xpDetails, hallOfFameService.getStudentHallOfFame(user));

        return xpDetails;
    }

    private int getCurrentEvolutionStageId(List<EvolutionStageThresholdResponseDto> evolutionStages, User user) {
        String evolutionStageName = Optional.ofNullable(hallOfFameService.getStudentHallOfFame(user).getEvolutionStage())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format(PROFILE_INFO_INCOMPLETE, LACKING_EVOLUTION_STAGES)));

        for (int i = 0; i < evolutionStages.size(); i++) {
            if (evolutionStages.get(i).getName().equals(evolutionStageName)) {
                return i;
            }
        }
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private EvolutionStageThresholdResponseDto getLeftEvolutionStage(List<EvolutionStageThresholdResponseDto> evolutionStages, int currentEvolutionStageId) {
        return evolutionStages.size() > (currentEvolutionStageId + 1) ?
                evolutionStages.get(currentEvolutionStageId)
                : evolutionStages.get(currentEvolutionStageId - 1);
    }

    private EvolutionStageThresholdResponseDto getRightEvolutionStage(List<EvolutionStageThresholdResponseDto> evolutionStages, int currentEvolutionStageId) {
        return evolutionStages.size() > (currentEvolutionStageId + 1) ?
                evolutionStages.get(currentEvolutionStageId + 1)
                : evolutionStages.get(currentEvolutionStageId);
    }

    private Long getTotalStudentsInCourse(Long courseId) {
        HallOfFameRequestDto request = HallOfFameRequestDto.builder()
                .courseId(courseId)
                .groups(Collections.emptyList())
                .searchBy(SearchBy.ANIMAL_NAME)
                .searchTerm("")
                .build();

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
