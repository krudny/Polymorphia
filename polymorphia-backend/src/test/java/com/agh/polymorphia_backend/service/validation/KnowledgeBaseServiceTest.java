package com.agh.polymorphia_backend.service.validation;


import com.agh.polymorphia_backend.dto.response.knowledge.base.KnowledgeBaseResponseDto;
import com.agh.polymorphia_backend.repository.course.CourseRepository;
import com.agh.polymorphia_backend.repository.course.EvolutionStagesRepository;
import com.agh.polymorphia_backend.repository.course.reward.ChestRepository;
import com.agh.polymorphia_backend.repository.course.reward.ItemRepository;
import com.agh.polymorphia_backend.service.course.KnowledgeBaseService;
import com.agh.polymorphia_backend.service.mapper.KnowledgeBaseMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

public class KnowledgeBaseServiceTest {
    private static final Long COURSE_ID = 99L;
    private static KnowledgeBaseService service;
    @Mock
    private EvolutionStagesRepository evolutionStagesRepository;
    @Mock
    private ChestRepository chestRepository;
    @Mock
    private ItemRepository itemRepository;
    @Mock
    private CourseRepository courseRepository;
    @Mock
    private KnowledgeBaseMapper knowledgeBaseMapper;
    @Mock
    private AccessAuthorizer accessAuthorizer;

    static Stream<Function<KnowledgeBaseService, List<KnowledgeBaseResponseDto>>> serviceMethods() {
        return Stream.of(
                s -> s.getEvolutionStages(COURSE_ID),
                s -> s.getChests(COURSE_ID),
                s -> s.getItems(COURSE_ID)
        );
    }

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        service = new KnowledgeBaseService(
                evolutionStagesRepository,
                chestRepository,
                itemRepository,
                courseRepository,
                knowledgeBaseMapper,
                accessAuthorizer
        );
    }

    @ParameterizedTest
    @MethodSource("serviceMethods")
    public void getKnowledgeBaseResponseDto_shouldThrow_whenCourseNotFound(Function<KnowledgeBaseService, List<KnowledgeBaseResponseDto>> knowledgeBaseMethod) {
        when(courseRepository.findById(COURSE_ID)).thenReturn(Optional.empty());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () ->
                knowledgeBaseMethod.apply(service));

        assertEquals(404, ex.getStatusCode().value());
        assertEquals(AccessAuthorizer.COURSE_NOT_FOUND, ex.getReason());
    }
}
