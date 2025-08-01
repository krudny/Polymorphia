package com.agh.polymorphia_backend.service.grade;


import com.agh.polymorphia_backend.dto.response.course.reward.item.assigned.AssignedItemResponseDto;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.reward.item.ItemType;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.grade.CriterionGrade;
import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.repository.grade.AssignedItemRepository;
import com.agh.polymorphia_backend.repository.grade.GradeRepository;
import com.agh.polymorphia_backend.service.course.AnimalService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
@Transactional
@AllArgsConstructor
public class GradeService {
    private final AnimalService animalService;
    private final GradeRepository gradeRepository;
    private final AssignedItemRepository assignedItemRepository;

    private final AssignedItemService assignedItemService;

    public BigDecimal getGradableEventXp(GradableEvent gradableEvent) {
        Animal animal = animalService.getAnimal(gradableEvent.getEventSection());
        Optional<Grade> grade = gradeRepository.findByGradableEventIdAndAnimalId(gradableEvent.getId(), animal.getId());
        return grade.map(g -> g.getCriteriaGrades().stream()
                        .map(CriterionGrade::getXp)
                        .reduce(BigDecimal.ZERO, BigDecimal::add))
                .orElse(BigDecimal.ZERO);
    }

    public BigDecimal getGradableEventsSumXp(Set<GradableEvent> gradableEvents) {
        return gradableEvents.stream()
                .map(this::getGradableEventXp)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public List<AssignedItemResponseDto> getAssignedItemDtos(Long eventSectionId, BigDecimal gainedXp, ItemType itemType) {
        return assignedItemRepository.findAllUsedByEventSectionId(eventSectionId).stream()
                .filter(assignedItem -> assignedItem.getItem().getItemType().equals(itemType))
                .map(assignedItem -> assignedItemService.assignedItemToResponseDto(assignedItem, gainedXp))
                .toList();
    }

    public BigDecimal getTotalBonusPoints(List<AssignedItemResponseDto> assignedItemDtos) {
        return assignedItemDtos
                .stream()
                .map(item -> item.getAssignmentDetails().getXp())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public Integer getTotalPercentage(List<AssignedItemResponseDto> assignedItemDtos) {
        return assignedItemDtos
                .stream()
                .map(item -> Optional.ofNullable(item.getAssignmentDetails().getPercentage()).orElse(0))
                .reduce(0, Integer::sum);
    }


    public Set<Grade> getAnimalGrades(Long animalId) {
        return gradeRepository.findByAnimalId(animalId).orElse(Collections.emptySet());
    }


}
