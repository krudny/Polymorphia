package com.agh.polymorphia_backend.service.course;


import com.agh.polymorphia_backend.dto.response.knowledge.base.KnowledgeBaseResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.repository.course.CourseRepository;
import com.agh.polymorphia_backend.repository.course.EvolutionStagesRepository;
import com.agh.polymorphia_backend.repository.course.reward.ChestRepository;
import com.agh.polymorphia_backend.repository.course.reward.ItemRepository;
import com.agh.polymorphia_backend.service.mapper.KnowledgeBaseMapper;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;
import java.util.function.Function;

import static com.agh.polymorphia_backend.service.validation.AccessAuthorizer.COURSE_NOT_FOUND;

@Service
@AllArgsConstructor
public class KnowledgeBaseService {

    private final EvolutionStagesRepository evolutionStagesRepository;
    private final ChestRepository chestRepository;
    private final ItemRepository itemRepository;
    private final CourseRepository courseRepository;
    private final KnowledgeBaseMapper knowledgeBaseMapper;
    private final AccessAuthorizer accessAuthorizer;

    public List<KnowledgeBaseResponseDto> getEvolutionStages(Long courseId) {
        return getKnowledgeBaseResponseDto(
                courseId,
                evolutionStagesRepository::findAllByCourseId,
                knowledgeBaseMapper::evolutionStageToResponseDto
        );
    }

    public List<KnowledgeBaseResponseDto> getChests(Long courseId) {
        return getKnowledgeBaseResponseDto(
                courseId,
                chestRepository::findAllByCourseId,
                knowledgeBaseMapper::chestToResponseDto
        );
    }

    public List<KnowledgeBaseResponseDto> getItems(Long courseId) {
        return getKnowledgeBaseResponseDto(
                courseId,
                itemRepository::findAllByCourseId,
                knowledgeBaseMapper::itemToResponseDto
        );
    }

    private <T> List<KnowledgeBaseResponseDto> getKnowledgeBaseResponseDto(
            Long courseId,
            Function<Long, List<T>> repositoryFetcher,
            Function<T, KnowledgeBaseResponseDto> mapper
    ) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, COURSE_NOT_FOUND));

        accessAuthorizer.authorizeCourseAccess(course);

        return repositoryFetcher.apply(courseId)
                .stream()
                .map(mapper)
                .sorted(Comparator.comparing(KnowledgeBaseResponseDto::getOrderIndex))
                .toList();
    }

}
