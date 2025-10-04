package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.dto.request.equipment.EquipmentChestOpenRequestDto;
import com.agh.polymorphia_backend.dto.response.equipment.EquipmentChestResponseDto;
import com.agh.polymorphia_backend.dto.response.equipment.EquipmentItemResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.course.reward.Chest;
import com.agh.polymorphia_backend.model.course.reward.Item;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedChest;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedItem;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedReward;
import com.agh.polymorphia_backend.model.user.AbstractRoleUser;
import com.agh.polymorphia_backend.repository.course.reward.ChestRepository;
import com.agh.polymorphia_backend.repository.course.reward.ItemRepository;
import com.agh.polymorphia_backend.service.course.AnimalService;
import com.agh.polymorphia_backend.service.course.CourseService;
import com.agh.polymorphia_backend.service.course.reward.AssignedRewardService;
import com.agh.polymorphia_backend.service.course.reward.BonusXpCalculator;
import com.agh.polymorphia_backend.service.mapper.AssignedRewardMapper;
import com.agh.polymorphia_backend.service.mapper.RewardMapper;
import com.agh.polymorphia_backend.service.user.UserService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class EquipmentService {
    private static final String INVALID_ITEM = "Item not found in the chest";
    private final AccessAuthorizer accessAuthorizer;
    private final CourseService courseService;
    private final AnimalService animalService;
    private final UserService userService;
    private final AssignedRewardService assignedRewardService;
    private final AssignedRewardMapper assignedRewardMapper;
    private final BonusXpCalculator bonusXpCalculator;
    private final ChestRepository chestRepository;
    private final RewardMapper rewardMapper;
    private final ItemRepository itemRepository;

    public List<EquipmentItemResponseDto> getEquipmentItems(Long courseId) {
        Long animalId = validateAndGetAnimalId(courseId);
        List<AssignedItem> assignedItems = assignedRewardService.getAnimalAssignedItems(animalId);
        List<Long> assignedItemIds = getAssignedRewardsIds(new ArrayList<>(assignedItems));
        List<Item> remainingCourseItems = itemRepository.findAllByCourseIdAndIdNotIn(courseId, assignedItemIds);

        return Stream.concat(
                        assignedRewardMapper.assignedItemsToResponseDto(assignedItems).stream(),
                        rewardMapper.itemsToEquipmentResponseDto(remainingCourseItems).stream()
                )
                .sorted(Comparator.comparing(response -> response.getBase().getOrderIndex()))
                .toList();
    }

    public List<EquipmentChestResponseDto> getEquipmentChests(Long courseId) {
        Long animalId = validateAndGetAnimalId(courseId);
        List<AssignedChest> assignedChests = assignedRewardService.getAnimalAssignedChests(animalId);
        List<Long> assignedChestIds = getAssignedRewardsIds(new ArrayList<>(assignedChests));
        List<Chest> remainingCourseChests = chestRepository.findAllByCourseIdAndIdNotIn(courseId, assignedChestIds);

        return Stream.concat(
                        assignedRewardMapper.assignedChestsToResponseDto(assignedChests).stream(),
                        rewardMapper.chestsToEquipmentResponseDto(remainingCourseChests).stream()
                )
                .sorted(Comparator.comparing(response -> response.getBase().getOrderIndex()))
                .toList();
    }

    @Transactional
    public void openChest(Long courseId, EquipmentChestOpenRequestDto requestDto) {
        Long animalId = validateAndGetAnimalId(courseId);
        AssignedChest assignedChest = assignedRewardService.getAssignedChestByIdAndAnimalId(
                requestDto.getAssignedChestId(),
                animalId
        );

        ZonedDateTime openDate = ZonedDateTime.now();
        Chest chest = (Chest) Hibernate.unproxy(assignedChest.getReward());

        List<AssignedItem> assignedItems = switch (chest.getBehavior()) {
            case ONE_OF_MANY -> createAssignedItemsFromRequest(requestDto, assignedChest, openDate);
            case ALL -> createAssignedItemsFromAssignedChest(chest, assignedChest, openDate);
        };

        assignedChest.setIsUsed(true);
        assignedChest.setUsedDate(openDate);
        assignedChest.getAssignedItems().addAll(assignedItems);

        assignedRewardService.saveAssignedChest(assignedChest);
        assignedRewardService.saveAssignedItems(assignedItems);
        bonusXpCalculator.countFlatBonusXp(animalId);

    }

    private List<Long> getAssignedRewardsIds(List<AssignedReward> assignedRewards) {
        return assignedRewards.stream()
                .map(assignedChest -> assignedChest.getReward().getId())
                .toList();
    }

    private List<AssignedItem> createAssignedItemsFromRequest(EquipmentChestOpenRequestDto requestDto, AssignedChest assignedChest, ZonedDateTime openDate) {
        if (requestDto.getItemId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        Item item = ((Chest) Hibernate.unproxy(assignedChest.getReward())).getItems().stream()
                .map(i -> (Item) Hibernate.unproxy(i))
                .filter(i -> i.getId().equals(requestDto.getItemId()))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, INVALID_ITEM));

        return List.of(
                assignedRewardService.createAssignedItem(assignedChest, item, openDate)
        );
    }

    private List<AssignedItem> createAssignedItemsFromAssignedChest(Chest chest, AssignedChest assignedChest, ZonedDateTime openDate) {
        return chest
                .getItems().stream()
                .map(i -> (Item) Hibernate.unproxy(i))
                .map(item -> assignedRewardService.createAssignedItem(assignedChest, item, openDate))
                .toList();
    }

    private Long validateAndGetAnimalId(Long courseId) {
        Course course = courseService.getCourseById(courseId);
        accessAuthorizer.authorizeCourseAccess(course);
        AbstractRoleUser student = userService.getCurrentUser();

        return animalService.getAnimal(student.getUserId(), courseId).getId();
    }

}
