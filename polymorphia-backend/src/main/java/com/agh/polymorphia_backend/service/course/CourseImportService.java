package com.agh.polymorphia_backend.service.course;

import com.agh.polymorphia_backend.dto.request.course_import.CourseDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.EvolutionStageDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.reward.ChestDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.reward.ItemDetailsRequestDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.service.course.strategy.ChestUpdateStrategy;
import com.agh.polymorphia_backend.service.course.strategy.EntityUpdateStrategy;
import com.agh.polymorphia_backend.service.course.strategy.EvolutionStageUpdateStrategy;
import com.agh.polymorphia_backend.service.course.strategy.ItemUpdateStrategy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CourseImportService {

    private final CourseService courseService;
    private final CourseDetailsService courseDetailsService;
    private final EvolutionStageUpdateStrategy evolutionStageUpdateStrategy;
    private final ItemUpdateStrategy itemUpdateStrategy;
    private final ChestUpdateStrategy chestUpdateStrategy;

    @Transactional
    public void importCourse(CourseDetailsRequestDto request) {

    }

    @Transactional
    public void updateCourse(CourseDetailsRequestDto request, Long courseId) {
        CourseDetailsRequestDto currentConfig = courseDetailsService.getCourseDetails(courseId);

        if (!request.equals(currentConfig)) {
            Course course = courseService.getCourseById(courseId);
            course.setName(request.getName());
            course.setMarkdownSourceUrl(request.getMarkdownSourceUrl());
        }
        updateEvolutionStages(request.getEvolutionStages(), currentConfig.getEvolutionStages(), courseId);
        updateItems(request.getItems(), currentConfig.getItems(), courseId);
        updateChests(request.getChests(), currentConfig.getChests(), courseId);
    }

    private void updateChests(List<ChestDetailsRequestDto> request, List<ChestDetailsRequestDto> currentConfig, Long courseId) {
        updateEntities(request, currentConfig, courseId, chestUpdateStrategy);
    }

    private void updateItems(List<ItemDetailsRequestDto> request, List<ItemDetailsRequestDto> currentConfig, Long courseId) {
        updateEntities(request, currentConfig, courseId, itemUpdateStrategy);
    }


    private void updateEvolutionStages(List<EvolutionStageDetailsRequestDto> request, List<EvolutionStageDetailsRequestDto> currentConfig, Long courseId) {
        updateEntities(request, currentConfig, courseId, evolutionStageUpdateStrategy);
    }

    public <T, R> void updateEntities(List<T> request, List<T> currentConfig, Long courseId, EntityUpdateStrategy<T, R> strategy) {
        if (request.equals(currentConfig)) return;

        Map<T, Long> orderIds = CourseImportUtil.enumerateAsMap(request);

        List<T> newItems = CourseImportUtil.getNewEntities(request, currentConfig, strategy.getKeyExtractor());
        List<T> deletedItems = CourseImportUtil.getDeletedEntities(request, currentConfig, strategy.getKeyExtractor());
        List<T> modifiedItems = CourseImportUtil.getModifiedEntities(request, currentConfig, strategy.getKeyExtractor());

        if (strategy.getTypeExtractor() != null) {
            CourseImportUtil.handleTypeChangedObjects(newItems, deletedItems, modifiedItems, currentConfig, strategy.getKeyExtractor(), strategy.getTypeExtractor());
        }

        deleteEntities(deletedItems, strategy);
        strategy.flush();
        createEntities(newItems, orderIds, courseId, strategy);
        updateExistingEntities(modifiedItems, orderIds, courseId, strategy);
    }

    private <T, R> void deleteEntities(List<T> entities, EntityUpdateStrategy<T, R> strategy) {
        if (entities.isEmpty()) return;

        List<String> keys = entities.stream().map(strategy.getKeyExtractor()).toList();

        List<R> entitiesToDelete = strategy.findAllByKeys(keys);
        strategy.getRepository().deleteAll(entitiesToDelete);
    }

    private <T, R> void createEntities(List<T> items, Map<T, Long> orderIds, Long courseId, EntityUpdateStrategy<T, R> strategy) {
        if (items.isEmpty()) return;

        List<R> newEntities = items.stream().map(dto -> {
            R entity = strategy.createNewEntity(dto);
            return strategy.updateEntity(entity, dto, orderIds, courseId);
        }).toList();

        strategy.getRepository().saveAll(newEntities);
    }

    private <T, R> void updateExistingEntities(List<T> entities, Map<T, Long> orderIds, Long courseId, EntityUpdateStrategy<T, R> strategy) {
        if (entities.isEmpty()) return;

        List<String> keys = entities.stream()
                .map(strategy.getKeyExtractor())
                .toList();

        Map<String, R> entitiesByKey = strategy.findAllByKeys(keys).stream()
                .collect(
                        Collectors.toMap(
                                strategy.getEntityKeyExtractor(),
                                Function.identity()
                        )
                );

        List<R> updatedEntities = entities.stream()
                .map(dto -> {
                    String key = strategy.getKeyExtractor().apply(dto);
                    R entity = entitiesByKey.get(key);
                    return strategy.updateEntity(entity, dto, orderIds, courseId);
                })
                .collect(Collectors.toCollection(ArrayList::new));

        strategy.getRepository().saveAll(updatedEntities);
    }

}
