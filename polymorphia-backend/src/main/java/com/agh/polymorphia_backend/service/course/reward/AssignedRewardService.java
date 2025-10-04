package com.agh.polymorphia_backend.service.course.reward;

import com.agh.polymorphia_backend.model.course.reward.Item;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedChest;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedItem;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedReward;
import com.agh.polymorphia_backend.repository.course.reward.assigned.AssignedChestRepository;
import com.agh.polymorphia_backend.repository.course.reward.assigned.AssignedItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class AssignedRewardService {
    private static final String NO_ASSIGNED_CHEST_FOUND = "No assigned chest found";
    private final AssignedChestRepository assignedChestRepository;
    private final AssignedItemRepository assignedItemRepository;

    public List<AssignedChest> getAnimalAssignedChests(Long animalId) {
        return assignedChestRepository.findAnimalAssignedChests(animalId);
    }

    public List<AssignedItem> getAnimalAssignedItems(Long animalId) {
        List<AssignedChest> openedChests = getAnimalAssignedChests(animalId).stream()
                .filter(AssignedReward::getIsUsed)
                .toList();

        return openedChests.stream()
                .flatMap(chest -> chest.getAssignedItems().stream())
                .toList();
    }

    public AssignedChest getAssignedChestByIdAndAnimalId(Long assignedChestId, Long animalId) {
        List<AssignedChest> assignedChests = getAnimalAssignedChests(animalId);
        return assignedChests.stream()
                .filter(assignedChest ->
                        assignedChest.getId().equals(assignedChestId)
                                && !assignedChest.getIsUsed()
                )
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, NO_ASSIGNED_CHEST_FOUND));
    }

    public AssignedItem createAssignedItem(AssignedChest assignedChest, Item item, ZonedDateTime openDate) {
        return AssignedItem.builder()
                .reward(item)
                .assignedChest(assignedChest)
                .reward(item)
                .criterionGrade(assignedChest.getCriterionGrade())
                .isUsed(false)
                .bonusXp(BigDecimal.ZERO)
                .receivedDate(openDate)
                .build();
    }

    public void saveAssignedChest(AssignedChest chest) {
        assignedChestRepository.save(chest);
    }

    public void saveAssignedItems(List<AssignedItem> items) {
        assignedItemRepository.saveAll(items);
    }

}
