package com.agh.polymorphia_backend.service.hall_of_fame;

import com.agh.polymorphia_backend.dto.request.HallOfFameRequestDto;
import com.agh.polymorphia_backend.dto.response.hall_of_fame.HallOfFameResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFame;
import com.agh.polymorphia_backend.model.hall_of_fame.StudentScoreDetail;
import com.agh.polymorphia_backend.model.hall_of_fame.OverviewField;
import com.agh.polymorphia_backend.model.hall_of_fame.SearchBy;
import com.agh.polymorphia_backend.model.hall_of_fame.SortOrder;
import com.agh.polymorphia_backend.repository.hall_of_fame.HallOfFameRepository;
import com.agh.polymorphia_backend.repository.hall_of_fame.StudentScoreDetailRepository;
import com.agh.polymorphia_backend.service.course.CourseService;
import com.agh.polymorphia_backend.service.mapper.HallOfFameMapper;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import com.agh.polymorphia_backend.util.NumberFormatter;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.agh.polymorphia_backend.model.hall_of_fame.HallOfFame.FIELD_POSITION;

@Service
@AllArgsConstructor
public class HallOfFameService {
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
        return switch (sortSpec){
            case OverviewFieldSort overviewFieldSort -> getSortedByOverviewFields(requestDto, overviewFieldSort.field());
            case EventSectionSort eventSectionSort -> getSortedByEventSection(requestDto);
        };
    }

    public Page<HallOfFameResponseDto> getSortedByOverviewFields(HallOfFameRequestDto requestDto, String sortBy) {
        Pageable pageable = PageRequest.of(
                requestDto.page(),
                requestDto.size(),
                Sort.by(requestDto.sortOrder().getDirection(), sortBy).and(Sort.by(FIELD_POSITION).ascending())
        );
        Page<HallOfFame> pageResult = hallOfFameRepository.findHofPage(requestDto, pageable);
        return hallOfFamePageToResponseDto(pageResult, pageable);
    }

    public Page<HallOfFameResponseDto> getSortedByEventSection(HallOfFameRequestDto requestDto) {
        Pageable pageable = PageRequest.of(requestDto.page(), requestDto.size());
        Page<HallOfFame> pageResult = hallOfFameRepository.findAnimalIdsSortedByEventSection(requestDto, pageable);
        return hallOfFamePageToResponseDto(pageResult, pageable);
    }

    private Page<HallOfFameResponseDto> hallOfFamePageToResponseDto(Page<HallOfFame> hallOfFamePage, Pageable pageable) {
        Map<Long, Map<String, String>> detailsByAnimalId = groupScoreDetails(hallOfFamePage);
        List<HallOfFameResponseDto> dtoList = getDtoList(hallOfFamePage, detailsByAnimalId);
        return new PageImpl<>(dtoList, pageable, hallOfFamePage.getTotalElements());
    }

    private Map<Long, Map<String, String>> groupScoreDetails(Page<HallOfFame> pageResult) {
        List<Long> animalIds = pageResult.getContent().stream()
                .map(HallOfFame::getAnimalId)
                .toList();
        List<StudentScoreDetail> detailsList = scoreDetailRepository.findByAnimalIdIn(animalIds);
        Map<Long, Map<String, String>> result = new HashMap<>();
        for (StudentScoreDetail details : detailsList) {
            result.computeIfAbsent(details.getAnimalId(), id -> new HashMap<>())
                    .put(details.getEventSectionName(), NumberFormatter.format(details.getRawXp()));
        }
        return result;
    }

    private  List<HallOfFameResponseDto> getDtoList(
            Page<HallOfFame> page, Map<Long, Map<String, String>> detailsByAnimalId
    ){
        return page.stream()
                .map(hallOfFame ->
                        hallOfFameMapper.hallOfFameToRecordDto(hallOfFame, detailsByAnimalId.get(hallOfFame.getAnimalId())))
                .toList();
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
