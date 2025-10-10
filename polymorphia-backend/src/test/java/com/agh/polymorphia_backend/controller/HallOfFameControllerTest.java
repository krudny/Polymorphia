package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.HallOfFameRequestDto;
import com.agh.polymorphia_backend.model.hall_of_fame.SearchBy;
import com.agh.polymorphia_backend.model.hall_of_fame.SortOrder;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static com.agh.polymorphia_backend.controller.ControllerTestUtil.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

class HallOfFameControllerTest extends ControllerTestConfig {
    private static final HallOfFameRequestDto.HallOfFameRequestDtoBuilder hofBuilder = HallOfFameRequestDto.builder()
            .courseId(1L)
            .page(0)
            .size(10)
            .searchBy(SearchBy.ANIMAL_NAME)
            .searchTerm("hof_")
            .groups(List.of("mi-sr12"));

    private static Stream<Arguments> hallOfFameSource() {
        return Stream.of(
                Arguments.of(
                        hofBuilder
                                .sortBy("animalName")
                                .sortOrder(SortOrder.ASC)
                                .build(),
                        new ClassPathResource("responses/hall_of_fame/sortByAnimalNameAsc.json"),
                        "sort by animalName asc"
                ),
                Arguments.of(
                        hofBuilder
                                .sortBy("bonuses")
                                .sortOrder(SortOrder.DESC)
                                .build(),
                        new ClassPathResource("responses/hall_of_fame/sortByBonusesDesc.json"),
                        "sort by bonuses desc"
                ),
                Arguments.of(
                        hofBuilder
                                .sortBy("total")
                                .sortOrder(SortOrder.DESC)
                                .build(),
                        new ClassPathResource("responses/hall_of_fame/sortByTotalDesc.json"),
                        "sort by total desc"
                ),
                Arguments.of(
                        hofBuilder
                                .sortBy("Lab")
                                .sortOrder(SortOrder.DESC)
                                .build(),
                        new ClassPathResource("responses/hall_of_fame/sortByFirstEventSectionDesc.json"),
                        "sort by \"Lab\" desc"
                ),
                Arguments.of(
                        hofBuilder
                                .sortBy("Kartkówka")
                                .sortOrder(SortOrder.DESC)
                                .build(),
                        new ClassPathResource("responses/hall_of_fame/sortBySecondEventSectionDesc.json"),
                        "sort by \"Kartkówka\" desc"
                )
        );
    }

    @Test
    void getPodium_shouldReturnPodium() throws IOException {
        String actualResponse = getEndpoint("/hall-of-fame/podium?courseId={courseId}",
                "student@agh.com", "password", 200, 1);

        ObjectMapper mapper = new ObjectMapper();
        Resource resource = new ClassPathResource("responses/hall_of_fame/podium.json");
        assertEquals(mapper.readTree(actualResponse), mapper.readTree(getExpectedResponse(resource)));
    }

    @ParameterizedTest(name = "{2}")
    @MethodSource("hallOfFameSource")
    void getHallOfFame_shouldReturnHalOfFame(HallOfFameRequestDto requestDto, Resource resource, String testName) throws IOException {
        String actualResponse = postEndpoint("/hall-of-fame", "student@agh.com",
                "password", 200, Optional.of(requestDto));

        ObjectMapper mapper = new ObjectMapper();
        assertEquals(mapper.readTree(actualResponse), mapper.readTree(getExpectedResponse(resource)));
    }

    @Test
    void getHallOfFame_shouldReturnError() {
        HallOfFameRequestDto hof = hofBuilder
                .sortBy("some-not-existing-sort-by")
                .sortOrder(SortOrder.DESC)
                .build();

        postEndpoint("/hall-of-fame", "student@agh.com", "password", 500, Optional.of(hof));
    }
}
