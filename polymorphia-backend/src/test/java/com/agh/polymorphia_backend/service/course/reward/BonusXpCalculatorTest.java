package com.agh.polymorphia_backend.service.course.reward;

import com.agh.polymorphia_backend.BaseTest;
import com.agh.polymorphia_backend.model.course.reward.FlatBonusItem;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedItem;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedReward;
import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItemBehavior;
import com.agh.polymorphia_backend.model.course.reward.item.ItemType;
import com.agh.polymorphia_backend.model.gradable_event.Grade;
import com.agh.polymorphia_backend.service.gradable_event.GradeService;
import com.agh.polymorphia_backend.service.hall_of_fame.HallOfFameService;
import com.google.ortools.Loader;
import org.hibernate.Hibernate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static com.agh.polymorphia_backend.service.course.reward.BonusXpCalculatorTestUtil.*;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class BonusXpCalculatorTest extends BaseTest {

    @Mock
    private AssignedRewardService assignedRewardService;

    @Mock
    private HallOfFameService hallOfFameService;

    @Mock
    private GradeService gradeService;

    private BonusXpCalculator bonusXpCalculator;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        Loader.loadNativeLibraries();
        OptimalGradeItemMatchingFinder optimalGradeItemMatchingFinder = new OptimalGradeItemMatchingFinder();
        bonusXpCalculator = new BonusXpCalculator(assignedRewardService, gradeService, optimalGradeItemMatchingFinder, hallOfFameService);
    }

    private void mockServiceCalls(Long animalId, List<AssignedItem> items, List<Grade> grades) {
        when(assignedRewardService.getAnimalAssignedItemsByType(animalId, ItemType.FLAT_BONUS)).thenReturn(items);
        when(assignedRewardService.groupFlatBonusItemsByBehavior(items))
                .thenReturn(items.stream()
                        .sorted(Comparator.comparing(AssignedReward::getReceivedDate))
                        .collect(Collectors.groupingBy(
                                assignedItem -> ((FlatBonusItem) Hibernate.unproxy(assignedItem.getReward())).getBehavior(),
                                Collectors.toList()
                        )));
        when(gradeService.getAnimalGrades(animalId)).thenReturn(grades);
    }

    @Nested
    @DisplayName("One Event Item Distribution Tests")
    class OneEventItemTests {

        @ParameterizedTest(name = "{index} => items={0}, grades={1}, expectedBonuses={2}")
        @MethodSource("com.agh.polymorphia_backend.service.course.reward.BonusXpCalculatorTestUtil#matchingTestCases")
        @DisplayName("Should find optimal matching for multiple cases")
        void shouldFindOptimalMatchingCases(
                List<AssignedItem> items,
                List<Grade> grades,
                List<BigDecimal> expectedBonuses
        ) {
            // Given
            Long animalId = 1L;
            mockServiceCalls(animalId, items, grades);

            // When
            bonusXpCalculator.updateAnimalFlatBonusXp(animalId);

            // Then
            for (int i = 0; i < expectedBonuses.size(); i++) {
                assertEquals(expectedBonuses.get(i), items.get(i).getBonusXp(),
                        "Mismatch at item " + i);
            }
        }

        @Test
        @DisplayName("Should handle empty grades list")
        void shouldHandleEmptyGradesList() {
            // Given
            Long animalId = 1L;
            List<AssignedItem> items = List.of(createAssignedItem(BigDecimal.valueOf(5.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 1L));
            List<Grade> grades = new ArrayList<>();

            when(assignedRewardService.getAnimalAssignedItems(animalId))
                    .thenReturn(items);
            when(gradeService.getAnimalGrades(animalId))
                    .thenReturn(grades);

            // When & Then
            assertDoesNotThrow(() -> bonusXpCalculator.updateAnimalFlatBonusXp(animalId));
            verify(assignedRewardService, never()).saveAssignedItems(any());
        }
    }

    @Nested
    @DisplayName("Behavior Filter Tests")
    class BehaviorFilterTests {

        @Test
        @DisplayName("Should only process ONE_EVENT behavior items")
        void shouldOnlyProcessOneEventItems() {
            // Given
            Long animalId = 1L;
            List<AssignedItem> allItems = List.of(
                    createAssignedItemWithBehavior(BigDecimal.valueOf(5.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 1L),
                    createAssignedItemWithBehavior(BigDecimal.valueOf(3.0), FlatBonusItemBehavior.MULTIPLE_EVENTS, DEFAULT_DATE, 1L),
                    createAssignedItemWithBehavior(BigDecimal.valueOf(4.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 1L)
            );
            List<Grade> grades = List.of(
                    createGrade(BigDecimal.valueOf(2.0), BigDecimal.valueOf(10.0), 1L, 1L)
            );

            mockServiceCalls(animalId, allItems, grades);

            // When
            bonusXpCalculator.updateAnimalFlatBonusXp(animalId);

            // Then
            verify(assignedRewardService).saveAssignedItems(argThat(items ->
                    items.size() == 2 &&
                            items.stream().allMatch(item ->
                                    ((FlatBonusItem) item.getReward()).getBehavior() == FlatBonusItemBehavior.ONE_EVENT)
            ));
        }
    }
}