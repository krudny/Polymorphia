package com.agh.polymorphia_backend.service.hall_of_fame;

import com.agh.polymorphia_backend.dto.request.hall_of_fame.HallOfFameRequestDto;
import com.agh.polymorphia_backend.dto.response.hall_of_fame.HallOfFameResponseDto;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.event_section.EventSection;
import com.agh.polymorphia_backend.model.hall_of_fame.*;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.course.event_section.EventSectionRepository;
import com.agh.polymorphia_backend.repository.hall_of_fame.HallOfFameRepository;
import com.agh.polymorphia_backend.repository.hall_of_fame.StudentScoreDetailRepository;
import com.agh.polymorphia_backend.service.course.AnimalService;
import com.agh.polymorphia_backend.service.course.CourseService;
import com.agh.polymorphia_backend.service.mapper.HallOfFameMapper;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import com.agh.polymorphia_backend.util.NumberFormatter;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

import static com.agh.polymorphia_backend.model.hall_of_fame.HallOfFameEntry.FIELD_POSITION;

@Service
@AllArgsConstructor
public class HallOfFameService {
    public static final String STUDENT_HOF_NOT_FOUND = "Student's Hall of Fame scores not found";
    private final StudentScoreDetailRepository scoreDetailRepository;
    private final HallOfFameRepository hallOfFameRepository;
    private final EventSectionRepository eventSectionRepository;
    private final HallOfFameMapper hallOfFameMapper;
    private final AccessAuthorizer accessAuthorizer;
    private final CourseService courseService;
    private final AnimalService animalService;
    private final HallOfFameSortSpecResolver sortSpecResolver;

    public HallOfFameEntry getStudentHallOfFame(User user) {
        Animal animal = animalService.getAnimal(user.getId(), user.getPreferredCourse().getId());
        return hallOfFameRepository.findByAnimalId(animal.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_HOF_NOT_FOUND));
    }

    public List<StudentScoreDetail> getStudentScoreDetails(Long animalId) {
        return scoreDetailRepository.findByAnimalId(animalId);
    }

    public StudentScoreDetail getStudentEventSectionScoreDetails(Long animalId, Long eventSectionId) {
        return scoreDetailRepository.findByAnimalIdAndEventSectionId(animalId, eventSectionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_HOF_NOT_FOUND));
    }

    public Page<HallOfFameResponseDto> getHallOfFame(HallOfFameRequestDto requestDto) {
        Course course = courseService.getCourseById(requestDto.courseId());
        accessAuthorizer.authorizeCourseAccess(course);

        HallOfFameSortSpec sortSpec = sortSpecResolver.resolve(requestDto);
        return switch (sortSpec) {
            case OverviewFieldSort overviewFieldSort ->
                    getSortedByOverviewFields(requestDto, overviewFieldSort.field());
            case EventSectionSort eventSectionSort -> getSortedByEventSection(requestDto);
        };
    }

    public Page<HallOfFameResponseDto> getSortedByOverviewFields(HallOfFameRequestDto requestDto, String sortBy) {
        Pageable pageable = PageRequest.of(
                requestDto.page(),
                requestDto.size(),
                Sort.by(requestDto.sortOrder().getDirection(), sortBy).and(Sort.by(FIELD_POSITION).ascending())
        );
        Page<HallOfFameEntry> pageResult = hallOfFameRepository.findHofPageFromOverviewField(requestDto, pageable);
        return hallOfFamePageToResponseDto(pageResult);
    }

    public Page<HallOfFameResponseDto> getSortedByEventSection(HallOfFameRequestDto requestDto) {
        Pageable pageable = PageRequest.of(requestDto.page(), requestDto.size());
        Page<HallOfFameEntry> pageResult = hallOfFameRepository.findHofPageFromEventSection(requestDto, pageable);
        return hallOfFamePageToResponseDto(pageResult);
    }

    private Page<HallOfFameResponseDto> hallOfFamePageToResponseDto(Page<HallOfFameEntry> hallOfFamePage) {
        List<Long> animalIds = hallOfFamePage.getContent().stream()
                .map(HallOfFameEntry::getAnimalId)
                .toList();

        Map<Long, Map<String, String>> detailsByAnimalId = groupScoreDetails(animalIds);

        return hallOfFamePage.map(hallOfFame -> {
            Map<String, String> xpDetails = detailsByAnimalId.get(hallOfFame.getAnimalId());
            updateXpDetails(xpDetails, hallOfFame);
            return hallOfFameMapper.hallOfFameToRecordDto(hallOfFame, xpDetails);
        });
    }

    public Map<Long, Map<String, String>> groupScoreDetails(List<Long> animalIds) {
        List<StudentScoreDetail> detailsList = scoreDetailRepository.findByAnimalIdIn(animalIds);

        sortByEventSectionOrderIndex(detailsList);
        Map<Long, Map<String, String>> result = new HashMap<>();

        for (StudentScoreDetail details : detailsList) {
            result.computeIfAbsent(details.getAnimalId(), id -> new LinkedHashMap<>())
                    .put(details.getEventSectionName(), NumberFormatter.formatToString(details.getRawXp()));
        }

        return result;
    }

    private void sortByEventSectionOrderIndex(List<StudentScoreDetail> detailsList) {
        Set<Long> eventSectionIds = detailsList.stream()
                .map(StudentScoreDetail::getEventSectionId).collect(Collectors.toSet());

        Map<Long, EventSection> eventSectionMap = eventSectionRepository.findByIdIn(eventSectionIds)
                .stream()
                .collect(Collectors.toMap(EventSection::getId, e -> e));

        detailsList.sort(Comparator.comparingLong(d ->
                eventSectionMap.get(d.getEventSectionId()).getOrderIndex()
        ));
    }

    public void updateXpDetails(Map<String, String> xpDetails, HallOfFameEntry hallOfFameEntry) {
        xpDetails.computeIfAbsent(OverviewField.BONUS.getKey(),
                k -> NumberFormatter.formatToString(hallOfFameEntry.getTotalBonusSum()));
        xpDetails.computeIfAbsent(OverviewField.TOTAL.getKey(),
                k -> NumberFormatter.formatToString(hallOfFameEntry.getTotalXpSum()));
    }

    public List<HallOfFameResponseDto> getPodium(Long courseId) {
        Course course = courseService.getCourseById(courseId);
        accessAuthorizer.authorizeCourseAccess(course);

        HallOfFameRequestDto requestDto = new HallOfFameRequestDto(
                courseId,
                0,
                3,
                "",
                SearchBy.ANIMAL_NAME,
                OverviewField.TOTAL.getDbField(),
                SortOrder.DESC,
                Collections.emptyList()
        );
        return getSortedByOverviewFields(requestDto, requestDto.sortBy()).getContent();
    }
}