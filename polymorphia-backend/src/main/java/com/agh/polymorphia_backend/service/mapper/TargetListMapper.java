package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.target_list.StudentTargetDataResponseDto;
import com.agh.polymorphia_backend.dto.response.target_list.StudentTargetResponseDto;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFameEntry;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TargetListMapper {
    public List<StudentTargetResponseDto> mapHofEntriesToStudentTargets(Page<HallOfFameEntry> hofEntries) {
        return hofEntries.stream()
                .map(this::mapHofEntryToStudentTarget)
                .toList();
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
                .position(hofEntry.getPosition())
                .gainedXp(hofEntry.getTotalXpSum())
                .build();
    }
}
