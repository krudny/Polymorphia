package com.agh.polymorphia_backend.service.course.reward;

import com.agh.polymorphia_backend.model.course.reward.FlatBonusItem;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedItem;
import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItemBehavior;
import com.agh.polymorphia_backend.model.criterion.Criterion;
import com.agh.polymorphia_backend.model.criterion.CriterionGrade;
import com.agh.polymorphia_backend.model.event_section.EventSection;
import com.agh.polymorphia_backend.model.event_section.TestSection;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.gradable_event.Grade;
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
                                createAssignedItem(BigDecimal.valueOf(3.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 1L),
                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 2L),

                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.MULTIPLE_EVENTS, DEFAULT_DATE, 1L)
                        ),
                        List.of(
                                createGrade(BigDecimal.valueOf(7.0), BigDecimal.valueOf(10.0), 1L, 1L),
                                createGrade(BigDecimal.valueOf(6.0), BigDecimal.valueOf(8.0), 2L, 2L)
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
                                createAssignedItem(BigDecimal.valueOf(5.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 3L),
                                createAssignedItem(BigDecimal.valueOf(1.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 4L),

                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.MULTIPLE_EVENTS, DEFAULT_DATE, 3L),
                                createAssignedItem(BigDecimal.valueOf(4.0), FlatBonusItemBehavior.MULTIPLE_EVENTS, DEFAULT_DATE, 4L)
                        ),
                        List.of(
                                createGrade(BigDecimal.valueOf(5.0), BigDecimal.valueOf(7.0), 3L, 3L),
                                createGrade(BigDecimal.valueOf(5.0), BigDecimal.valueOf(8.0), 4L, 4L)
                        ),
                        List.of(
                                BigDecimal.valueOf(2.0),
                                BigDecimal.valueOf(1.0),
                                BigDecimal.valueOf(0.0),
                                BigDecimal.valueOf(2.0)
                        )
                ),
                // full points, rewards not applied
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(4.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 5L),
                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 6L),

                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.MULTIPLE_EVENTS, DEFAULT_DATE, 5L),
                                createAssignedItem(BigDecimal.valueOf(4.0), FlatBonusItemBehavior.MULTIPLE_EVENTS, DEFAULT_DATE, 6L)
                        ),
                        List.of(
                                createGrade(BigDecimal.valueOf(3.0), BigDecimal.valueOf(3.0), 5L, 5L),
                                createGrade(BigDecimal.valueOf(8.0), BigDecimal.valueOf(8.0), 6L, 6L)
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
                                createAssignedItem(BigDecimal.valueOf(0.1), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 1L),
                                createAssignedItem(BigDecimal.valueOf(0.2), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 2L)
                        ),
                        List.of(
                                createGrade(BigDecimal.valueOf(4.9), BigDecimal.valueOf(5.0), 1L, 1L),
                                createGrade(BigDecimal.valueOf(2.8), BigDecimal.valueOf(3.0), 2L, 2L)
                        ),
                        List.of(
                                BigDecimal.valueOf(0.1),
                                BigDecimal.valueOf(0.2)
                        )
                ),
                //Big rewards
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(100.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 1L),
                                createAssignedItem(BigDecimal.valueOf(1.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 2L)
                        ),
                        List.of(
                                createGrade(BigDecimal.valueOf(0.0), BigDecimal.valueOf(50.0), 1L, 1L),
                                createGrade(BigDecimal.valueOf(99.0), BigDecimal.valueOf(100.0), 2L, 2L)
                        ),
                        List.of(
                                BigDecimal.valueOf(50.0),
                                BigDecimal.valueOf(1.0)
                        )
                ),
                //oneEventItems won't cover all loss
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(1.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 1L),
                                createAssignedItem(BigDecimal.valueOf(1.5), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 2L),

                                createAssignedItem(BigDecimal.valueOf(4.0), FlatBonusItemBehavior.MULTIPLE_EVENTS, DEFAULT_DATE, 1L),
                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.MULTIPLE_EVENTS, DEFAULT_DATE, 2L)
                        ),
                        List.of(
                                createGrade(BigDecimal.valueOf(2.0), BigDecimal.valueOf(5.0), 1L, 1L),
                                createGrade(BigDecimal.valueOf(1.0), BigDecimal.valueOf(4.0), 2L, 2L)
                        ),
                        List.of(
                                BigDecimal.valueOf(1.0),
                                BigDecimal.valueOf(1.5),
                                BigDecimal.valueOf(2.0),
                                BigDecimal.valueOf(1.5)
                        )
                ),
                // More oneEventItems than grades
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(5.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 1L),
                                createAssignedItem(BigDecimal.valueOf(3.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 2L),
                                createAssignedItem(BigDecimal.valueOf(1.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 1L)
                        ),
                        List.of(
                                createGrade(BigDecimal.valueOf(2.0), BigDecimal.valueOf(10.0), 1L, 1L),
                                createGrade(BigDecimal.valueOf(5.0), BigDecimal.valueOf(8.0), 2L, 2L)
                        ),
                        List.of(
                                BigDecimal.valueOf(5.0),
                                BigDecimal.valueOf(3.0),
                                BigDecimal.valueOf(1.0)
                        )
                ),
                // More rewards than criteriaGrades - two same items
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(5.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 1L),
                                createAssignedItem(BigDecimal.valueOf(3.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 2L),
                                createAssignedItem(BigDecimal.valueOf(3.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 1L)
                        ),
                        List.of(
                                createGrade(BigDecimal.valueOf(3.0), BigDecimal.valueOf(10.0), 1L, 1L),
                                createGrade(BigDecimal.valueOf(5.0), BigDecimal.valueOf(8.0), 2L, 2L)
                        ),
                        List.of(
                                BigDecimal.valueOf(5.0),
                                BigDecimal.valueOf(3.0),
                                BigDecimal.valueOf(2.0)
                        )
                ),
                // More grades than rewards
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(4.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 1L),
                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 2L)
                        ),
                        List.of(
                                createGrade(BigDecimal.valueOf(1.0), BigDecimal.valueOf(5.0), 1L, 1L),
                                createGrade(BigDecimal.valueOf(3.0), BigDecimal.valueOf(6.0), 2L, 2L),
                                createGrade(BigDecimal.valueOf(4.0), BigDecimal.valueOf(7.0), 3L, 3L),
                                createGrade(BigDecimal.valueOf(2.0), BigDecimal.valueOf(5.0), 4L, 4L)
                        ),
                        List.of(
                                BigDecimal.valueOf(4.0),
                                BigDecimal.valueOf(2.0)
                        )
                ),
                // multipleEventsItems bigger than remainingLoss
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(9.0), FlatBonusItemBehavior.MULTIPLE_EVENTS, DEFAULT_DATE, 1L)
                        ),
                        List.of(
                                createGrade(BigDecimal.valueOf(1.0), BigDecimal.valueOf(5.0), 1L, 1L),
                                createGrade(BigDecimal.valueOf(3.0), BigDecimal.valueOf(6.0), 2L, 2L)
                        ),
                        List.of(
                                BigDecimal.valueOf(4.0)
                        )
                ),

                // multipleEventsItems sorted by receivedDate
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.MULTIPLE_EVENTS,
                                        ZonedDateTime.of(2025, 9, 30, 23, 0, 0, 0,
                                                ZoneId.of("Greenwich")), 1L
                                ),
                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.MULTIPLE_EVENTS,
                                        ZonedDateTime.of(2025, 9, 29, 23, 0, 0, 0,
                                                ZoneId.of("Greenwich")), 1L
                                ),
                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.MULTIPLE_EVENTS,
                                        ZonedDateTime.of(2025, 9, 28, 23, 0, 0, 0,
                                                ZoneId.of("Greenwich")), 1L
                                )
                        ),
                        List.of(
                                createGrade(BigDecimal.valueOf(2.0), BigDecimal.valueOf(5.0), 1L, 1L)
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
                                createAssignedItem(BigDecimal.valueOf(3.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 1L),
                                createAssignedItem(BigDecimal.valueOf(3.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 2L)
                        ),
                        List.of(
                                createGrade(BigDecimal.valueOf(5.0), BigDecimal.valueOf(8.0), 1L, 1L),
                                createGrade(BigDecimal.valueOf(7.0), BigDecimal.valueOf(10.0), 2L, 2L)
                        ),
                        List.of(
                                BigDecimal.valueOf(3.0),
                                BigDecimal.valueOf(3.0)
                        )
                ),
                //Multiple grades with same loss
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 1L),
                                createAssignedItem(BigDecimal.valueOf(2.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 2L),
                                createAssignedItem(BigDecimal.valueOf(1.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 3L)
                        ),
                        List.of(
                                createGrade(BigDecimal.valueOf(3.0), BigDecimal.valueOf(5.0), 1L, 1L),
                                createGrade(BigDecimal.valueOf(3.0), BigDecimal.valueOf(5.0), 2L, 2L),
                                createGrade(BigDecimal.valueOf(3.0), BigDecimal.valueOf(5.0), 3L, 3L)
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
                                createAssignedItem(BigDecimal.valueOf(20.0), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 1L)
                        ),
                        List.of(
                                createGrade(BigDecimal.valueOf(8.0), BigDecimal.valueOf(9.0), 1L, 1L),
                                createGrade(BigDecimal.valueOf(7.0), BigDecimal.valueOf(8.0), 2L, 2L),
                                createGrade(BigDecimal.valueOf(6.0), BigDecimal.valueOf(7.0), 3L, 3L)
                        ),
                        List.of(
                                BigDecimal.valueOf(1.0)
                        )
                ),
                // precision requiring case
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(2.33), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 1L),
                                createAssignedItem(BigDecimal.valueOf(1.67), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 2L)
                        ),
                        List.of(
                                createGrade(BigDecimal.valueOf(7.67), BigDecimal.valueOf(10.0), 1L, 1L),
                                createGrade(BigDecimal.valueOf(3.33), BigDecimal.valueOf(5.0), 2L, 2L)
                        ),
                        List.of(
                                BigDecimal.valueOf(2.33),
                                BigDecimal.valueOf(1.67)
                        )
                ),
                Arguments.of(
                        List.of(
                                createAssignedItem(BigDecimal.valueOf(2.33), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 1L),
                                createAssignedItem(BigDecimal.valueOf(1.67), FlatBonusItemBehavior.ONE_EVENT, DEFAULT_DATE, 2L)
                        ),
                        List.of(
                                createGrade(BigDecimal.valueOf(7.67), BigDecimal.valueOf(10.0), 1L, 1L),
                                createGrade(BigDecimal.valueOf(3.33), BigDecimal.valueOf(5.0), 2L, 2L)
                        ),
                        List.of(
                                BigDecimal.valueOf(2.33),
                                BigDecimal.valueOf(1.67)
                        )
                )
        );
    }

    static AssignedItem createAssignedItem(BigDecimal bonusXp, FlatBonusItemBehavior behavior, ZonedDateTime receivedDate, Long sectionId) {
        return createAssignedItemWithBehavior(bonusXp, behavior, receivedDate, sectionId);
    }

    static AssignedItem createAssignedItemWithBehavior(BigDecimal bonusXp, FlatBonusItemBehavior behavior, ZonedDateTime receivedDate, Long sectionId) {
        EventSection eventSection = TestSection.builder()
                .id(sectionId)
                .build();

        FlatBonusItem flatBonusItem = FlatBonusItem.builder()
                .xpBonus(bonusXp)
                .behavior(behavior)
                .eventSection(eventSection)
                .build();

        return AssignedItem.builder()
                .reward(flatBonusItem)
                .receivedDate(receivedDate)
                .build();
    }

    static Grade createGrade(BigDecimal currentXp, BigDecimal maxXp, Long id, Long sectionId) {
        EventSection eventSection = TestSection.builder()
                .id(sectionId)
                .build();

        GradableEvent gradableEvent = GradableEvent.builder()
                .eventSection(eventSection)
                .build();

        Criterion criterion = Criterion.builder()
                .maxXp(maxXp)
                .build();

        CriterionGrade criterionGrade = CriterionGrade.builder()
                .id(id)
                .xp(currentXp)
                .criterion(criterion)
                .build();

        return Grade.builder()
                .id(id)
                .criteriaGrades(List.of(criterionGrade))
                .gradableEvent(gradableEvent)
                .build();
    }
}