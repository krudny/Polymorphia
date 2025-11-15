package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.request.hall_of_fame.HallOfFameRequestDto;
import com.agh.polymorphia_backend.dto.request.target_list.CourseGroupsTargetListRequestDto;
import com.agh.polymorphia_backend.dto.request.target_list.GradingTargetListRequestDto;
import com.agh.polymorphia_backend.dto.response.target_list.StudentTargetDataResponseDto;
import com.agh.polymorphia_backend.dto.response.target_list.StudentTargetResponseDto;
import com.agh.polymorphia_backend.model.course.CourseGroup;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFameEntry;
import com.agh.polymorphia_backend.service.hall_of_fame.EventSectionSort;
import com.agh.polymorphia_backend.service.hall_of_fame.HallOfFameSortSpec;
import com.agh.polymorphia_backend.service.hall_of_fame.HallOfFameSortSpecResolver;
import com.agh.polymorphia_backend.service.hall_of_fame.OverviewFieldSort;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class TargetListMapper {
    private final HallOfFameSortSpecResolver hallOfFameSortSpecResolver;

    public List<StudentTargetResponseDto> mapHofEntriesToStudentTargets(Page<HallOfFameEntry> hofEntries) {
        return hofEntries.stream()
                .map(this::mapHofEntryToStudentTarget)
                .toList();
    }

    public HallOfFameRequestDto toHofRequest(CourseGroupsTargetListRequestDto requestDto, CourseGroup courseGroup) {
        return HallOfFameRequestDto.builder()
                .sortBy(requestDto.getSortBy())
                .groups(List.of(courseGroup.getName()))
                .courseId(courseGroup.getCourse().getId())
                .searchBy(requestDto.getSearchBy())
                .searchTerm(requestDto.getSearchTerm())
                .sortOrder(requestDto.getSortOrder())
                .page(0)
                .size(Integer.MAX_VALUE)
                .build();
    }

    public OverviewFieldSort getOverviewFieldSort(HallOfFameRequestDto hofRequest) {
        HallOfFameSortSpec sortSpec = hallOfFameSortSpecResolver.resolve(hofRequest);
        return switch (sortSpec) {
            case OverviewFieldSort overviewFieldSort ->
                    overviewFieldSort;
            case EventSectionSort eventSectionSort ->
                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                            "Nie udało się wczytać listy członków grupy zajęciowej.");
        };
    }

    private StudentTargetResponseDto mapHofEntryToStudentTarget(HallOfFameEntry hofEntry) {
        StudentTargetDataResponseDto studentTargetDataResponseDto = mapHofEntryToStudentTargetData(hofEntry);

        return StudentTargetResponseDto.builder()
                .id(studentTargetDataResponseDto.id())
                .student(studentTargetDataResponseDto)
                .build();
    }

    private StudentTargetDataResponseDto mapHofEntryToStudentTargetData(HallOfFameEntry hofEntry) {
        return StudentTargetDataResponseDto.builder()
                .id(hofEntry.getStudentId())
                .fullName(hofEntry.getStudentName())
                .animalName(hofEntry.getAnimalName())
                .evolutionStage(hofEntry.getEvolutionStage())
                .group(hofEntry.getGroupName())
                .imageUrl(hofEntry.getImageUrl())
                .gainedXp(hofEntry.getTotalXpSum())
                .build();
    }
}
