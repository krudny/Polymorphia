package com.agh.polymorphia_backend.service.hall_of_fame;

import com.agh.polymorphia_backend.dto.request.HallOfFameRequestDto;
import com.agh.polymorphia_backend.dto.response.hall_of_fame.HallOfFameRecordDto;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFame;
import com.agh.polymorphia_backend.model.StudentScoreDetail;
import com.agh.polymorphia_backend.repository.HallOfFameRepository;
import com.agh.polymorphia_backend.repository.StudentScoreDetailRepository;
import com.agh.polymorphia_backend.service.mapper.HallOfFameMapper;
import com.agh.polymorphia_backend.util.NumberFormatter;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class HallOfFameService {
    private final StudentScoreDetailRepository scoreDetailRepository;
    private final HallOfFameRepository hallOfFameRepository;
    private final HallOfFameMapper hallOfFameMapper;
    private final HallOfFameSortSpecResolver sortSpecResolver;

    public Page<HallOfFameRecordDto> getHallOfFame(
            HallOfFameRequestDto requestDto,
            boolean includeStudentName
    ) {
        HallOfFameSortSpec sortSpec = sortSpecResolver.resolve(requestDto);
        return switch (sortSpec){
            case OverviewFieldSort overviewFieldSort -> {
                requestDto.setSortBy(overviewFieldSort.field());
                yield getSortedByOverviewFields(requestDto, includeStudentName);
            }
            case EventSectionSort eventSectionSort -> getSortedByEventSection(requestDto, includeStudentName);
        };
    }

    public Page<HallOfFameRecordDto> getSortedByOverviewFields(HallOfFameRequestDto requestDto, boolean includeStudentName) {
        Page<HallOfFame> pageResult = hallOfFameRepository.findHofPage(
                requestDto.getCourseId(),
                requestDto.getSearchTerm(),
                requestDto.getGroups(),
                requestDto.getPageable()
        );

        List<Long> animalIds = pageResult.getContent().stream()
                .map(HallOfFame::getAnimalId)
                .toList();

        Map<Long, Map<String, String>> detailsByAnimalId = groupScoreDetails(animalIds);
        List<HallOfFameRecordDto> dtoList = getDtoList(pageResult.stream(), detailsByAnimalId, includeStudentName);

        return new PageImpl<>(dtoList, requestDto.getPageable(), pageResult.getTotalElements());
    }

    private Map<Long, Map<String, String>> groupScoreDetails(List<Long> animalIds) {
        List<StudentScoreDetail> detailsList = scoreDetailRepository.findByAnimalIdIn(animalIds);
        Map<Long, Map<String, String>> result = new HashMap<>();
        for (StudentScoreDetail details : detailsList) {
            result.computeIfAbsent(details.getAnimalId(), id -> new HashMap<>())
                    .put(details.getEventSectionName(), NumberFormatter.format(details.getRawXp()));
        }
        return result;
    }

    private  List<HallOfFameRecordDto> getDtoList(
            Stream<HallOfFame> stream, Map<Long, Map<String, String>> detailsByAnimalId,
            boolean includeStudentName
    ){
        return stream
                .map(hallOfFame ->
                        hallOfFameMapper.hallOfFameToRecordDto(hallOfFame, detailsByAnimalId.get(hallOfFame.getAnimalId()), includeStudentName))
                .toList();
    }

    public Page<HallOfFameRecordDto> getSortedByEventSection(HallOfFameRequestDto requestDto, boolean includeStudentName) {
        int page = requestDto.getPage();
        int size = requestDto.getSize();
        int offset = page * size;

        List<Long> animalIds = hallOfFameRepository.findAnimalIdsSortedByEventSection(
                requestDto.getCourseId(),
                requestDto.getSearchTerm(),
                requestDto.getGroupsAsArray(),
                requestDto.getSortBy(),
                requestDto.getSortOrder().name(),
                size,
                offset
        );

        if (animalIds.isEmpty()) {
            return Page.empty();
        }

        List<HallOfFame> hofViews = getSortedHallOfFame(animalIds);
        Map<Long, Map<String, String>> detailsByAnimalId = groupScoreDetails(animalIds);
        List<HallOfFameRecordDto> dtoList = getDtoList(hofViews.stream(), detailsByAnimalId, includeStudentName);

        long total = hallOfFameRepository.countByCourseIdAndFilters(
                requestDto.getCourseId(),
                requestDto.getSearchTerm(),
                requestDto.getGroupsAsArray()
        );

        return new PageImpl<>(dtoList, PageRequest.of(page, size), total);
    }

    private List<HallOfFame> getSortedHallOfFame(List<Long> animalIds){
        List<HallOfFame> hofViews = hallOfFameRepository.findByAnimalIdIn(animalIds);

        Map<Long, Integer> orderMap = new HashMap<>();
        for (int i = 0; i < animalIds.size(); i++) {
            orderMap.put(animalIds.get(i), i);
        }

        hofViews.sort(Comparator.comparingInt(view -> orderMap.get(view.getAnimalId())));
        return hofViews;
    }
}
