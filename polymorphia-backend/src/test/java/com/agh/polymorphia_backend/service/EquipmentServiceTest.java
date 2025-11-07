package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.dto.response.equipment.EquipmentChestResponseDto;
import com.agh.polymorphia_backend.dto.response.equipment.EquipmentItemResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.BaseRewardResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.assignment_details.ChestAssignmentDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.chest.ChestResponseDtoBase;
import com.agh.polymorphia_backend.model.course.reward.Chest;
import com.agh.polymorphia_backend.model.course.reward.FlatBonusItem;
import com.agh.polymorphia_backend.model.course.reward.Item;
import com.agh.polymorphia_backend.model.course.reward.PercentageBonusItem;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedChest;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedItem;
import com.agh.polymorphia_backend.model.course.reward.chest.ChestBehavior;
import com.agh.polymorphia_backend.repository.course.reward.ChestRepository;
import com.agh.polymorphia_backend.repository.course.reward.ItemRepository;
import com.agh.polymorphia_backend.service.course.reward.AssignedRewardService;
import com.agh.polymorphia_backend.service.course.reward.BonusXpCalculator;
import com.agh.polymorphia_backend.service.course.reward.PotentialBonusXpCalculator;
import com.agh.polymorphia_backend.service.mapper.AssignedRewardMapper;
import com.agh.polymorphia_backend.service.mapper.RewardMapper;
import com.agh.polymorphia_backend.service.student.AnimalService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

class EquipmentServiceTest {

    private final Long courseId = 1L;
    private final Long animalId = 10L;
    @Mock
    private AnimalService animalService;
    @Mock
    private AssignedRewardService assignedRewardService;
    @Mock
    private AssignedRewardMapper assignedRewardMapper;
    @Mock
    private BonusXpCalculator bonusXpCalculator;
    @Mock
    private RewardMapper rewardMapper;
    @Mock
    private PotentialBonusXpCalculator potentialBonusXpCalculator;
    @Mock
    private ItemRepository itemRepository;
    @InjectMocks
    private EquipmentService equipmentService;
    @Mock
    private ChestRepository chestRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetEquipmentItems_returnsAssignedAndRemainingItems() {
        List<AssignedItem> animalAssignedItems = List.of(
                AssignedItem.builder().reward(FlatBonusItem.builder().id(1L).build()).build(),
                AssignedItem.builder().reward(FlatBonusItem.builder().id(2L).build()).build(),
                AssignedItem.builder().reward(FlatBonusItem.builder().id(3L).build()).build()
        );

        List<Item> remainingItems = List.of(
                FlatBonusItem.builder().id(4L).build(),
                FlatBonusItem.builder().id(5L).build(),
                PercentageBonusItem.builder().id(6L).build());

        EquipmentItemResponseDto item1 = EquipmentItemResponseDto.builder()
                .base(BaseRewardResponseDto.builder().orderIndex(2L).build())
                .build();

        EquipmentItemResponseDto item2 = EquipmentItemResponseDto.builder()
                .base(BaseRewardResponseDto.builder().orderIndex(3L).build())
                .build();

        EquipmentItemResponseDto item3 = EquipmentItemResponseDto.builder()
                .base(BaseRewardResponseDto.builder().orderIndex(1L).build())
                .build();

        EquipmentItemResponseDto item4 = EquipmentItemResponseDto.builder()
                .base(BaseRewardResponseDto.builder().orderIndex(5L).build())
                .build();

        EquipmentItemResponseDto item5 = EquipmentItemResponseDto.builder()
                .base(BaseRewardResponseDto.builder().orderIndex(4L).build())
                .build();

        List<EquipmentItemResponseDto> responseAssigned = List.of(item1, item2, item5);
        List<EquipmentItemResponseDto> responseRemaining = List.of(item4, item3);
        List<EquipmentItemResponseDto> expectedResult = List.of(item1, item2, item5, item3, item4);

        when(animalService.validateAndGetAnimalId(courseId)).thenReturn(animalId);
        when(assignedRewardService.getAnimalAssignedItems(animalId)).thenReturn(animalAssignedItems);
        when(itemRepository.findAllByCourseIdAndItemIdNotIn(courseId, List.of(1L, 2L, 3L)))
                .thenReturn(remainingItems);
        when(assignedRewardMapper.assignedItemsToResponseDto(animalAssignedItems))
                .thenReturn(responseAssigned);
        when(rewardMapper.itemsToEquipmentResponseDto(remainingItems))
                .thenReturn(responseRemaining);

        List<EquipmentItemResponseDto> items = equipmentService.getEquipmentItems(courseId);
        assertEquals(expectedResult, items);
    }

    @Test
    void testGetEquipmentChests_returnsAssignedAndRemainingChests() {
        Long chestId1 = 200L;
        Long chestId2 = 201L;

        ZonedDateTime now = ZonedDateTime.now();

        AssignedChest assignedChest1 = mock(AssignedChest.class);
        AssignedChest assignedChest2 = mock(AssignedChest.class);
        Chest chest1 = mock(Chest.class);
        Chest chest2 = mock(Chest.class);

        when(assignedChest1.getReward()).thenReturn(chest1);
        when(assignedChest2.getReward()).thenReturn(chest2);
        when(chest1.getId()).thenReturn(chestId1);
        when(chest2.getId()).thenReturn(chestId2);

        List<AssignedChest> assignedChests = List.of(assignedChest1, assignedChest2);
        List<Chest> remainingChests = List.of(
                Chest.builder().id(300L).orderIndex(1L).build(),
                Chest.builder().id(301L).orderIndex(2L).build()
        );

        ChestAssignmentDetailsResponseDto details1 = ChestAssignmentDetailsResponseDto.builder()
                .receivedDate(now)
                .receivedItems(new ArrayList<>())
                .build();

        ChestAssignmentDetailsResponseDto details2 = ChestAssignmentDetailsResponseDto.builder()
                .receivedDate(now.minusDays(1))
                .receivedItems(new ArrayList<>())
                .build();

        EquipmentChestResponseDto assignedChestResponse1 = EquipmentChestResponseDto.builder()
                .base(ChestResponseDtoBase.builder()
                        .id(chestId1)
                        .behavior(ChestBehavior.ONE_OF_MANY)
                        .orderIndex(10L)
                        .build())
                .details(details1)
                .build();

        EquipmentChestResponseDto assignedChestResponse2 = EquipmentChestResponseDto.builder()
                .base(ChestResponseDtoBase.builder()
                        .id(chestId2)
                        .behavior(ChestBehavior.ONE_OF_MANY)
                        .orderIndex(11L)
                        .build())
                .details(details2)
                .build();

        EquipmentChestResponseDto remainingChestResponse1 = EquipmentChestResponseDto.builder()
                .base(ChestResponseDtoBase.builder()
                        .id(300L)
                        .orderIndex(1L)
                        .behavior(ChestBehavior.ALL)
                        .build())
                .build();

        EquipmentChestResponseDto remainingChestResponse2 = EquipmentChestResponseDto.builder()
                .base(ChestResponseDtoBase.builder()
                        .id(301L)
                        .orderIndex(2L)
                        .behavior(ChestBehavior.ALL)
                        .build())
                .build();

        when(animalService.validateAndGetAnimalId(courseId)).thenReturn(animalId);
        when(assignedRewardService.getAnimalAssignedChests(animalId)).thenReturn(assignedChests);
        when(chestRepository.findAllByCourseIdAndChestIdNotIn(courseId, List.of(chestId1, chestId2)))
                .thenReturn(remainingChests);
        when(assignedRewardMapper.assignedChestsToResponseDto(assignedChests))
                .thenReturn(List.of(assignedChestResponse1, assignedChestResponse2));
        when(rewardMapper.chestsToEquipmentResponseDto(remainingChests))
                .thenReturn(List.of(remainingChestResponse1, remainingChestResponse2));
        when(assignedRewardService.getAnimalAssignedItems(animalId)).thenReturn(new ArrayList<>());
        when(assignedRewardService.countAssignedItemsByReward(any())).thenReturn(new HashMap<>());

        List<EquipmentChestResponseDto> chests = equipmentService.getEquipmentChests(courseId);

        assertNotNull(chests);
        assertEquals(4, chests.size());

        assertEquals(chestId2, chests.get(0).getBase().getId());
        assertEquals(chestId1, chests.get(1).getBase().getId());
        assertEquals(300L, chests.get(2).getBase().getId());
        assertEquals(301L, chests.get(3).getBase().getId());

        verify(animalService).validateAndGetAnimalId(courseId);
        verify(assignedRewardService).getAnimalAssignedChests(animalId);
        verify(chestRepository).findAllByCourseIdAndChestIdNotIn(courseId, List.of(chestId1, chestId2));

    }

//    @Test
//    void testOpenChest_createsAssignedItems() {
//        Long assignedChestId = 100L;
//
//        AssignedChest assignedChest = mock(AssignedChest.class);
//        Chest chest = mock(Chest.class);
//        when(animalService.validateAndGetAnimalId(courseId)).thenReturn(animalId);
//        when(assignedRewardService.getAssignedChestByIdAndAnimalId(assignedChestId, animalId))
//                .thenReturn(assignedChest);
//        when(assignedChest.getReward()).thenReturn(chest);
//
//        EquipmentChestOpenRequestDto requestDto = new EquipmentChestOpenRequestDto();
////        requestDto.setAssignedChestId(assignedChestId);
//        // Configure chest behavior and items
//
//        // You can verify that save methods were called
//        equipmentService.openChest(courseId, requestDto);
//        verify(assignedRewardService).saveAssignedChest(any());
//        verify(bonusXpCalculator).updateAnimalFlatBonusXp(animalId);
//        verify(bonusXpCalculator).updateAnimalPercentageBonusXp(animalId);
//    }
}
