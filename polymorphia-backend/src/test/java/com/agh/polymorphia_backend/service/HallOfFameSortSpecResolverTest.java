package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.dto.request.HallOfFameRequestDto;
import com.agh.polymorphia_backend.model.hall_of_fame.SearchBy;
import com.agh.polymorphia_backend.model.hall_of_fame.SortOrder;
import com.agh.polymorphia_backend.repository.course.event_section.EventSectionRepository;
import com.agh.polymorphia_backend.service.hall_of_fame.EventSectionSort;
import com.agh.polymorphia_backend.service.hall_of_fame.HallOfFameSortSpec;
import com.agh.polymorphia_backend.service.hall_of_fame.HallOfFameSortSpecResolver;
import com.agh.polymorphia_backend.service.hall_of_fame.OverviewFieldSort;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class HallOfFameSortSpecResolverTest {
    private static final Long COURSE_ID = 1L;
    private static final String EVENT_SECTION_NAME = "event section name";
    @Mock
    private EventSectionRepository eventSectionRepository;
    @InjectMocks
    private HallOfFameSortSpecResolver hallOfFameSortSpecResolver;

    @ParameterizedTest
    @MethodSource("overviewKeyToDbField")
    void resolve_shouldReturnOverviewFieldSort(String sortBy, String expectedDbField) {
        // Given
        HallOfFameRequestDto requestDto = testHallOfFameRequestDto(sortBy);

        // When
        HallOfFameSortSpec result = hallOfFameSortSpecResolver.resolve(requestDto);

        // Then
        assertThat(result).isInstanceOf(OverviewFieldSort.class);
        assertThat(((OverviewFieldSort) result).field()).isEqualTo(expectedDbField);
        verifyNoInteractions(eventSectionRepository);
    }

    public static Stream<Arguments> overviewKeyToDbField() {
        return Stream.of(
                Arguments.of("animalName", "animalName"),
                Arguments.of("studentName", "studentName"),
                Arguments.of("total", "totalXpSum"),
                Arguments.of("bonuses", "totalBonusSum")
        );
    }

    @Test
    void resolve_shouldReturnEventSectionSort() {
        // Given
        HallOfFameRequestDto requestDto = testHallOfFameRequestDto(EVENT_SECTION_NAME);

        // When
        when(eventSectionRepository.existsByCourseIdAndName(COURSE_ID, EVENT_SECTION_NAME)).thenReturn(true);
        HallOfFameSortSpec result = hallOfFameSortSpecResolver.resolve(requestDto);

        // Then
        assertThat(result).isInstanceOf(EventSectionSort.class);
    }

    @Test
    void resolve_shouldThrow_forInvalidSortBy() {
        // Given
        HallOfFameRequestDto requestDto = testHallOfFameRequestDto(EVENT_SECTION_NAME);

        // When
        when(eventSectionRepository.existsByCourseIdAndName(COURSE_ID, EVENT_SECTION_NAME)).thenReturn(false);

        // Then
        assertThrows(IllegalArgumentException.class, () -> hallOfFameSortSpecResolver.resolve(requestDto));
    }

    private HallOfFameRequestDto testHallOfFameRequestDto(String sortBy) {
        return new HallOfFameRequestDto(
                COURSE_ID, 0, 3, "", SearchBy.ANIMAL_NAME, sortBy, SortOrder.ASC, Collections.emptyList()
        );
    }
}
