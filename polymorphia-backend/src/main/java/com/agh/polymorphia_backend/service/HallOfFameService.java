package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.dto.response.hall_of_fame.HallOfFameRecordDto;
import com.agh.polymorphia_backend.model.HallOfFame;
import com.agh.polymorphia_backend.model.StudentScoreDetail;
import com.agh.polymorphia_backend.model.event.section.EventSection;
import com.agh.polymorphia_backend.repository.HallOfFameRepository;
import com.agh.polymorphia_backend.repository.StudentScoreDetailRepository;
import com.agh.polymorphia_backend.repository.event.section.EventSectionRepository;
import com.agh.polymorphia_backend.service.mapper.HallOfFameMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class HallOfFameService {
    private final EventSectionRepository eventSectionRepository;
    private final StudentScoreDetailRepository scoreDetailRepository;
    private final HallOfFameRepository hallOfFameRepository;
    private final HallOfFameMapper hallOfFameMapper;

    private static final Map<String, String> OVERVIEW_FIELDS = Map.ofEntries(Map.entry("animalName", "animalName"), Map.entry("total", "totalXpSum"), Map.entry("bonus", "totalBonusSum"));
    private static final String NUMBER_FORMAT = "%.02f";

    public Page<HallOfFameRecordDto> getHallOfFame(
            Long courseId,
            int page,
            int size,
            String searchTerm,
            String sortBy,
            String sortOrder,
            List<String> groupNames,
            boolean includeStudentName
    ) {
        if (searchTerm == null || searchTerm.isBlank()) {
            searchTerm = "";
        }
        if (!sortOrder.equals("asc") && !sortOrder.equals("desc")) {
            throw new IllegalArgumentException("Invalid sortOrder: " + sortOrder);
        }

        List<String> eventSectionNames = eventSectionRepository.findByCourseId(courseId).stream().map(EventSection::getName).toList();
        if (OVERVIEW_FIELDS.containsKey(sortBy)){
            List<String> groups = (groupNames == null || groupNames.isEmpty()) ? null : groupNames;
            return getSortedByOverviewFields(courseId, page, size, searchTerm, OVERVIEW_FIELDS.get(sortBy), sortOrder, groups, includeStudentName);
        } else if (eventSectionNames.contains(sortBy)) {
            String[] groups = (groupNames == null || groupNames.isEmpty()) ? new String[0] : groupNames.toArray(String[]::new);
            return getSortedByEventSection(courseId, page, size, searchTerm, sortBy, sortOrder, groups, includeStudentName);
        } else {
            throw new IllegalArgumentException("Invalid sortBy: " + sortBy);
        }
    }


    public Page<HallOfFameRecordDto> getSortedByOverviewFields(Long courseId, int page, int size, String searchTerm, String sortBy, String sortOrder, List<String> groupNames, boolean includeStudentName) {
        Sort.Direction direction = Sort.Direction.fromString(sortOrder);
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        Page<HallOfFame> pageResult = hallOfFameRepository.findHofPage(courseId, searchTerm, groupNames, pageable);

        List<Long> animalIds = pageResult.getContent().stream()
                .map(HallOfFame::getAnimalId)
                .toList();

        Map<Long, Map<String, String>> detailsByAnimalId = groupScoreDetails(animalIds);
        List<HallOfFameRecordDto> dtoList = getDtoList(pageResult.stream(), detailsByAnimalId, includeStudentName);

        return new PageImpl<>(dtoList, pageable, pageResult.getTotalElements());
    }

    private Map<Long, Map<String, String>> groupScoreDetails(List<Long> animalIds) {
        List<StudentScoreDetail> details = scoreDetailRepository.findByAnimalIdIn(animalIds);
        Map<Long, Map<String, String>> result = new HashMap<>();
        for (StudentScoreDetail d : details) {
            result.computeIfAbsent(d.getAnimalId(), id -> new HashMap<>())
                    .put(d.getEventSectionName(), formatNumber(d.getRawXp()));
        }
        return result;
    }

    private  List<HallOfFameRecordDto> getDtoList(Stream<HallOfFame> stream, Map<Long, Map<String, String>> detailsByAnimalId, boolean includeStudentName){
        return stream
                .map(hallOfFame ->
                        hallOfFameMapper.hallOfFameToRecordDto(hallOfFame, detailsByAnimalId.get(hallOfFame.getAnimalId()), includeStudentName))
                .toList();
    }

    public Page<HallOfFameRecordDto> getSortedByEventSection(Long courseId, int page, int size, String searchTerm, String sortBy, String sortOrder, String[] groups, boolean includeStudentName) {
        int offset = page * size;

        List<Long> animalIds = hallOfFameRepository.findAnimalIdsSortedByEventSection(courseId, searchTerm, groups, sortBy, sortOrder, size, offset);

        if (animalIds.isEmpty()) {
            return Page.empty();
        }

        List<HallOfFame> hofViews = getSortedHallOfFame(animalIds);
        Map<Long, Map<String, String>> detailsByAnimalId = groupScoreDetails(animalIds);
        List<HallOfFameRecordDto> dtoList = getDtoList(hofViews.stream(), detailsByAnimalId, includeStudentName);

        long total = hallOfFameRepository.countByCourseIdAndFilters(courseId, searchTerm, groups);

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

    public static String formatNumber(BigDecimal number) {
        return String.format(Locale.US, NUMBER_FORMAT, number);
    }
}
