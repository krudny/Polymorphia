package com.agh.polymorphia_backend.service.course.reward;

import com.agh.polymorphia_backend.model.course.reward.FlatBonusItem;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedItem;
import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItemBehavior;
import com.agh.polymorphia_backend.model.criterion.Criterion;
import com.agh.polymorphia_backend.model.criterion.CriterionGrade;
import org.junit.jupiter.params.provider.Arguments;

import java.math.BigDecimal;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Stream;

public class BonusXpCalculatorTestUtil {
    static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.of(2025, 9, 28, 23, 0, 0, 0, ZoneId.of("Greenwich"));

    public static Stream<Arguments> matchingTestCases() {
        return Stream.of(
                // oneEventItems exactly cover xp loss
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(3.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),
                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),

                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.MULTIPLE_EVENTS, DEFAULT_DATE)
                        ),
                        List.of(
                                createCriterionGrade(BigDecimal.valueOf(7.0), BigDecimal.valueOf(10.0), 1L),
                                createCriterionGrade(BigDecimal.valueOf(6.0), BigDecimal.valueOf(8.0), 2L)
                        ),
                        List.of(
                                BigDecimal.valueOf(3.0),
                                BigDecimal.valueOf(2.0),
                                BigDecimal.valueOf(0.0)
                        )
                ),
                // rewards greater than xp loss
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(5.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),
                                createAssignedItem(BigDecimal.valueOf(1.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),

                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.MULTIPLE_EVENTS, DEFAULT_DATE),
                                createAssignedItem(BigDecimal.valueOf(4.0), FlatBonusItemBehavior.MULTIPLE_EVENTS, DEFAULT_DATE)
                        ),
                        List.of(
                                createCriterionGrade(BigDecimal.valueOf(5.0), BigDecimal.valueOf(7.0), 3L),
                                createCriterionGrade(BigDecimal.valueOf(5.0), BigDecimal.valueOf(8.0), 4L)
                        ),
                        List.of(
                                BigDecimal.valueOf(3.0),
                                BigDecimal.valueOf(1.0),
                                BigDecimal.valueOf(1.0),
                                BigDecimal.valueOf(0.0)
                        )
                ),
                // full points, rewards not applied
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(4.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),
                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),

                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.MULTIPLE_EVENTS, DEFAULT_DATE),
                                createAssignedItem(BigDecimal.valueOf(4.0), FlatBonusItemBehavior.MULTIPLE_EVENTS, DEFAULT_DATE)
                        ),
                        List.of(
                                createCriterionGrade(BigDecimal.valueOf(3.0), BigDecimal.valueOf(3.0), 5L),
                                createCriterionGrade(BigDecimal.valueOf(8.0), BigDecimal.valueOf(8.0), 6L)
                        ),
                        List.of(
                                BigDecimal.valueOf(0.0),
                                BigDecimal.valueOf(0.0),
                                BigDecimal.valueOf(0.0),
                                BigDecimal.valueOf(0.0)
                        )
                ),
                // Small rewards
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(0.1), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),
                                createAssignedItem(BigDecimal.valueOf(0.05), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE)
                        ),
                        List.of(
                                createCriterionGrade(BigDecimal.valueOf(4.9), BigDecimal.valueOf(5.0), 1L),
                                createCriterionGrade(BigDecimal.valueOf(2.95), BigDecimal.valueOf(3.0), 2L)
                        ),
                        List.of(
                                BigDecimal.valueOf(0.1),
                                BigDecimal.valueOf(0.05)
                        )
                ),
                //Big rewards
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(100.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),
                                createAssignedItem(BigDecimal.valueOf(1.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE)
                        ),
                        List.of(
                                createCriterionGrade(BigDecimal.valueOf(0.0), BigDecimal.valueOf(50.0), 1L),
                                createCriterionGrade(BigDecimal.valueOf(99.0), BigDecimal.valueOf(100.0), 2L)
                        ),
                        List.of(
                                BigDecimal.valueOf(50.0),
                                BigDecimal.valueOf(1.0)
                        )
                ),
                //oneEventItems won't cover all loss
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(1.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),
                                createAssignedItem(BigDecimal.valueOf(1.5), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),

                                createAssignedItem(BigDecimal.valueOf(4.0), FlatBonusItemBehavior.MULTIPLE_EVENTS, DEFAULT_DATE),
                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.MULTIPLE_EVENTS, DEFAULT_DATE)
                        ),
                        List.of(
                                createCriterionGrade(BigDecimal.valueOf(2.0), BigDecimal.valueOf(5.0), 1L),
                                createCriterionGrade(BigDecimal.valueOf(1.0), BigDecimal.valueOf(4.0), 2L)
                        ),
                        List.of(
                                BigDecimal.valueOf(1.0),
                                BigDecimal.valueOf(1.5),
                                BigDecimal.valueOf(3.5),
                                BigDecimal.valueOf(0.0)
                        )
                ),
                // More oneEventItems than criteriaGrades
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(5.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),
                                createAssignedItem(BigDecimal.valueOf(3.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),
                                createAssignedItem(BigDecimal.valueOf(1.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE)
                        ),
                        List.of(
                                createCriterionGrade(BigDecimal.valueOf(2.0), BigDecimal.valueOf(10.0), 1L),
                                createCriterionGrade(BigDecimal.valueOf(5.0), BigDecimal.valueOf(8.0), 2L)
                        ),
                        List.of(
                                BigDecimal.valueOf(5.0),
                                BigDecimal.valueOf(3.0),
                                BigDecimal.valueOf(0.0)
                        )
                ),
                // More rewards than criteriaGrades - two same grades
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(5.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),
                                createAssignedItem(BigDecimal.valueOf(3.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),
                                createAssignedItem(BigDecimal.valueOf(3.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE)
                        ),
                        List.of(
                                createCriterionGrade(BigDecimal.valueOf(2.0), BigDecimal.valueOf(10.0), 1L),
                                createCriterionGrade(BigDecimal.valueOf(5.0), BigDecimal.valueOf(8.0), 2L)
                        ),
                        List.of(
                                BigDecimal.valueOf(5.0),
                                BigDecimal.valueOf(3.0),
                                BigDecimal.valueOf(0.0)
                        )
                ),
                // More criteriaGrades than rewards
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(4.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),
                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),

                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.MULTIPLE_EVENTS, DEFAULT_DATE)
                        ),
                        List.of(
                                createCriterionGrade(BigDecimal.valueOf(1.0), BigDecimal.valueOf(5.0), 1L),
                                createCriterionGrade(BigDecimal.valueOf(3.0), BigDecimal.valueOf(6.0), 2L),
                                createCriterionGrade(BigDecimal.valueOf(4.0), BigDecimal.valueOf(7.0), 3L)
                        ),
                        List.of(
                                BigDecimal.valueOf(4.0),
                                BigDecimal.valueOf(2.0),
                                BigDecimal.valueOf(2.0)
                        )
                ),
                // multipleEventsItems bigger than remainingLoss
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(9.0), FlatBonusItemBehavior.MULTIPLE_EVENTS, DEFAULT_DATE)
                        ),
                        List.of(
                                createCriterionGrade(BigDecimal.valueOf(1.0), BigDecimal.valueOf(5.0), 1L),
                                createCriterionGrade(BigDecimal.valueOf(3.0), BigDecimal.valueOf(6.0), 2L)
                        ),
                        List.of(
                                BigDecimal.valueOf(7.0)
                        )
                ),

                // multipleEventsItems sorted by receivedDate
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.MULTIPLE_EVENTS,
                                        ZonedDateTime.of(2025, 9, 30, 23, 0, 0, 0,
                                                ZoneId.of("Greenwich"))
                                ),
                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.MULTIPLE_EVENTS,
                                        ZonedDateTime.of(2025, 9, 29, 23, 0, 0, 0,
                                                ZoneId.of("Greenwich"))
                                ),
                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.MULTIPLE_EVENTS,
                                        ZonedDateTime.of(2025, 9, 28, 23, 0, 0, 0,
                                                ZoneId.of("Greenwich"))
                                )
                        ),
                        List.of(
                                createCriterionGrade(BigDecimal.valueOf(2.0), BigDecimal.valueOf(5.0), 1L)
                        ),
                        List.of(
                                BigDecimal.valueOf(0.0),
                                BigDecimal.valueOf(1.0),
                                BigDecimal.valueOf(2.0)
                        )
                ),

                // Identical compensation for oneEventItems
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(3.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),
                                createAssignedItem(BigDecimal.valueOf(3.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE)
                        ),
                        List.of(
                                createCriterionGrade(BigDecimal.valueOf(5.0), BigDecimal.valueOf(8.0), 1L),
                                createCriterionGrade(BigDecimal.valueOf(7.0), BigDecimal.valueOf(10.0), 2L)
                        ),
                        List.of(
                                BigDecimal.valueOf(3.0),
                                BigDecimal.valueOf(3.0)
                        )
                ),
                //Multiple criteria with same loss
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),
                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),
                                createAssignedItem(BigDecimal.valueOf(1.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE)
                        ),
                        List.of(
                                createCriterionGrade(BigDecimal.valueOf(3.0), BigDecimal.valueOf(5.0), 1L),
                                createCriterionGrade(BigDecimal.valueOf(3.0), BigDecimal.valueOf(5.0), 2L),
                                createCriterionGrade(BigDecimal.valueOf(3.0), BigDecimal.valueOf(5.0), 3L)
                        ),
                        List.of(
                                BigDecimal.valueOf(2.0),
                                BigDecimal.valueOf(2.0),
                                BigDecimal.valueOf(1.0)
                        )
                ),
                //one big reward vs multiple small losses
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(20.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE)
                        ),
                        List.of(
                                createCriterionGrade(BigDecimal.valueOf(8.0), BigDecimal.valueOf(9.0), 1L),
                                createCriterionGrade(BigDecimal.valueOf(7.0), BigDecimal.valueOf(8.0), 2L),
                                createCriterionGrade(BigDecimal.valueOf(6.0), BigDecimal.valueOf(7.0), 3L)
                        ),
                        List.of(
                                BigDecimal.valueOf(1.0)
                        )
                ),
                // precision requiring case
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(2.33), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),
                                createAssignedItem(BigDecimal.valueOf(1.67), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE)
                        ),
                        List.of(
                                createCriterionGrade(BigDecimal.valueOf(7.67), BigDecimal.valueOf(10.0), 1L),
                                createCriterionGrade(BigDecimal.valueOf(3.33), BigDecimal.valueOf(5.0), 2L)
                        ),
                        List.of(
                                BigDecimal.valueOf(2.33),
                                BigDecimal.valueOf(1.67)
                        )
                ),
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(2.33), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE),
                                createAssignedItem(BigDecimal.valueOf(1.67), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE)
                        ),
                        List.of(
                                createCriterionGrade(BigDecimal.valueOf(7.67), BigDecimal.valueOf(10.0), 1L),
                                createCriterionGrade(BigDecimal.valueOf(3.33), BigDecimal.valueOf(5.0), 2L)
                        ),
                        List.of(
                                BigDecimal.valueOf(2.33),
                                BigDecimal.valueOf(1.67)
                        )
                )
        );
    }

    static AssignedItem createAssignedItem(BigDecimal bonusXp, FlatBonusItemBehavior behavior, ZonedDateTime receivedDate) {
        return createAssignedItemWithBehavior(bonusXp, behavior, receivedDate);
    }

    static AssignedItem createAssignedItemWithBehavior(BigDecimal bonusXp, FlatBonusItemBehavior behavior, ZonedDateTime receivedDate) {
        FlatBonusItem flatBonusItem = FlatBonusItem.builder()
                .xpBonus(bonusXp)
                .behavior(behavior)
                .build();

        return AssignedItem.builder()
                .reward(flatBonusItem)
                .receivedDate(receivedDate)
                .build();
    }

    static CriterionGrade createCriterionGrade(BigDecimal currentXp, BigDecimal maxXp, Long id) {
        Criterion criterion = Criterion.builder()
                .maxXp(maxXp)
                .build();

        return CriterionGrade.builder()
                .id(id)
                .xp(currentXp)
                .criterion(criterion)
                .build();
    }


}
