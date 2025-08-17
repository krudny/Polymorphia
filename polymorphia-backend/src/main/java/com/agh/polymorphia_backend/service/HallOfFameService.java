package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.dto.response.hall_of_fame.HallOfFameRecordDto;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFame;
import com.agh.polymorphia_backend.model.StudentScoreDetail;
import com.agh.polymorphia_backend.model.event.section.EventSection;
import com.agh.polymorphia_backend.model.hall_of_fame.OverviewField;
import com.agh.polymorphia_backend.model.hall_of_fame.SortOrder;
import com.agh.polymorphia_backend.repository.HallOfFameRepository;
import com.agh.polymorphia_backend.repository.StudentScoreDetailRepository;
import com.agh.polymorphia_backend.repository.event.section.EventSectionRepository;
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
    private final EventSectionRepository eventSectionRepository;
    private final StudentScoreDetailRepository scoreDetailRepository;
    private final HallOfFameRepository hallOfFameRepository;
    private final HallOfFameMapper hallOfFameMapper;

    public Page<HallOfFameRecordDto> getHallOfFame(
            Long courseId,
            int page,
            int size,
            String searchTerm,
            String sortBy,
            String sortOrderString,
            List<String> groupNames,
            boolean includeStudentName
    ) {
        searchTerm = (searchTerm == null || searchTerm.isBlank()) ? "" : searchTerm;

        SortOrder sortOrder = SortOrder.fromString(sortOrderString);

        Optional<String> overviewDbField = OverviewField.getDbField(sortBy);
        if (overviewDbField.isPresent()){
            List<String> groups = (groupNames == null || groupNames.isEmpty()) ? null : groupNames;
            return getSortedByOverviewFields(courseId, page, size, searchTerm, overviewDbField.get(), sortOrder, groups, includeStudentName);
        }

        List<String> eventSectionNames = eventSectionRepository.findByCourseId(courseId).stream().map(EventSection::getName).toList();
        if (eventSectionNames.contains(sortBy)) {
            String[] groups = (groupNames == null || groupNames.isEmpty()) ? new String[0] : groupNames.toArray(String[]::new);
            return getSortedByEventSection(courseId, page, size, searchTerm, sortBy, sortOrder, groups, includeStudentName);
        }

        throw new IllegalArgumentException("Invalid sortBy: " + sortBy);
    }


    public Page<HallOfFameRecordDto> getSortedByOverviewFields(Long courseId, int page, int size, String searchTerm, String sortBy, SortOrder sortOrder, List<String> groupNames, boolean includeStudentName) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortOrder.getDirection(), sortBy));

        Page<HallOfFame> pageResult = hallOfFameRepository.findHofPage(courseId, searchTerm, groupNames, pageable);

        List<Long> animalIds = pageResult.getContent().stream()
                .map(HallOfFame::getAnimalId)
                .toList();

        Map<Long, Map<String, String>> detailsByAnimalId = groupScoreDetails(animalIds);
        List<HallOfFameRecordDto> dtoList = getDtoList(pageResult.stream(), detailsByAnimalId, includeStudentName);

        return new PageImpl<>(dtoList, pageable, pageResult.getTotalElements());
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

    private  List<HallOfFameRecordDto> getDtoList(Stream<HallOfFame> stream, Map<Long, Map<String, String>> detailsByAnimalId, boolean includeStudentName){
        return stream
                .map(hallOfFame ->
                        hallOfFameMapper.hallOfFameToRecordDto(hallOfFame, detailsByAnimalId.get(hallOfFame.getAnimalId()), includeStudentName))
                .toList();
    }

    public Page<HallOfFameRecordDto> getSortedByEventSection(Long courseId, int page, int size, String searchTerm, String sortBy, SortOrder sortOrder, String[] groups, boolean includeStudentName) {
        int offset = page * size;

        List<Long> animalIds = hallOfFameRepository.findAnimalIdsSortedByEventSection(courseId, searchTerm, groups, sortBy, sortOrder.name(), size, offset);

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
}
