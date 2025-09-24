package com.agh.polymorphia_backend.service.hall_of_fame;

import com.agh.polymorphia_backend.model.hall_of_fame.StudentScoreDetail;
import com.agh.polymorphia_backend.repository.hall_of_fame.HallOfFameRepository;
import com.agh.polymorphia_backend.repository.hall_of_fame.StudentScoreDetailRepository;
import com.agh.polymorphia_backend.util.NumberFormatter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class HallOfFameService {
    private static final String STUDENT_HOF_NOT_FOUND = "Student's Hall of Fame scores not found";
    private final StudentScoreDetailRepository scoreDetailRepository;
    private final HallOfFameRepository hallOfFameRepository;
    private final HallOfFameMapper hallOfFameMapper;
    private final HallOfFameSortSpecResolver sortSpecResolver;
    private final AccessAuthorizer accessAuthorizer;
    private final CourseService courseService;

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

    public HallOfFame getStudentHallOfFame(User user) {
        return hallOfFameRepository.findByStudentIdAndCourseId(user.getPreferredCourse().getId(), user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_HOF_NOT_FOUND));
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
        Map<Long, Map<String, String>> detailsByAnimalId = groupScoreDetails(hallOfFamePage);
        return hallOfFamePage.map(hallOfFame -> {
            Map<String, String> xpDetails = detailsByAnimalId.get(hallOfFame.getAnimalId());
            updateXpDetails(xpDetails, hallOfFame);
            return hallOfFameMapper.hallOfFameToRecordDto(hallOfFame, xpDetails);
        });
    }

    private Map<Long, Map<String, String>> groupScoreDetails(Page<HallOfFameEntry> pageResult) {
        List<Long> animalIds = pageResult.getContent().stream()
                .map(HallOfFameEntry::getAnimalId)
                .toList();
        List<StudentScoreDetail> detailsList = scoreDetailRepository.findByAnimalIdIn(animalIds);
        Map<Long, Map<String, String>> result = new HashMap<>();
        for (StudentScoreDetail details : detailsList) {
            result.computeIfAbsent(details.getAnimalId(), id -> new HashMap<>())
                    .put(details.getEventSectionName(), NumberFormatter.format(details.getRawXp()));
        }
        return result;
    }

    private void updateXpDetails(Map<String, String> xpDetails, HallOfFameEntry hallOfFameEntry) {
        xpDetails.computeIfAbsent(OverviewField.BONUS.getKey(),
                k -> NumberFormatter.format(hallOfFameEntry.getTotalBonusSum()));
        xpDetails.computeIfAbsent(OverviewField.TOTAL.getKey(),
                k -> NumberFormatter.format(hallOfFameEntry.getTotalXpSum()));
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