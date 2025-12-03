package com.agh.polymorphia_backend.service.course;

import com.agh.polymorphia_backend.dto.request.course_import.CourseDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.EvolutionStageDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.SubmissionRequirementDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.criterion.CriterionDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.criterion.CriterionRewardDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.event_section.EventSectionDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.gradable_event.AssignmentDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.gradable_event.GradableEventDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.gradable_event.ProjectDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.reward.ChestDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.reward.ItemDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.variant.VariantCategoryDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.variant.VariantDetailsRequestDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.criterion.CriterionReward;
import com.agh.polymorphia_backend.model.event_section.EventSectionType;
import com.agh.polymorphia_backend.model.reward.Reward;
import com.agh.polymorphia_backend.repository.criterion.CriterionRepository;
import com.agh.polymorphia_backend.repository.criterion.CriterionRewardRepository;
import com.agh.polymorphia_backend.repository.event_section.EventSectionRepository;
import com.agh.polymorphia_backend.repository.gradable_event.GradableEventRepository;
import com.agh.polymorphia_backend.repository.project.ProjectVariantCategoryRepository;
import com.agh.polymorphia_backend.repository.reward.RewardRepository;
import com.agh.polymorphia_backend.service.course.strategy.*;
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
    private final EventSectionUpdateStrategy eventSectionUpdateStrategy;
    private final GradableEventUpdateStrategy gradableEventUpdateStrategy;
    private final EventSectionRepository eventSectionRepository;
    private final CriterionUpdateStrategy criterionUpdateStrategy;
    private final GradableEventRepository gradableEventRepository;
    private final SubmissionRequirementUpdateStrategy submissionRequirementUpdateStrategy;
    private final ProjectVariantCategoryUpdateStrategy projectVariantCategoryUpdateStrategy;
    private final ProjectVariantUpdateStrategy projectVariantUpdateStrategy;
    private final ProjectVariantCategoryRepository projectVariantCategoryRepository;
    private final CriterionRepository criterionRepository;
    private final RewardRepository rewardRepository;
    private final CriterionRewardRepository criterionRewardRepository;

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
        updateEventSections(request.getEventSections(), currentConfig.getEventSections(), courseId);
    }

    private void updateGradableEvents(List<GradableEventDetailsRequestDto> request, List<GradableEventDetailsRequestDto> currentConfig, Long eventSectionId) {
        updateEntities(request, currentConfig, eventSectionId, gradableEventUpdateStrategy);
        Map<String, GradableEventDetailsRequestDto> currentConfigByKey = currentConfig.stream().collect(Collectors.toMap(GradableEventDetailsRequestDto::getKey, Function.identity()));

        request.forEach(gradableEvent -> {
            GradableEventDetailsRequestDto currentGradableEvent = currentConfigByKey.get(gradableEvent.getKey());

            updateCriteria(gradableEvent.getCriteria(), currentGradableEvent != null ? currentGradableEvent.getCriteria() : List.of(), gradableEventRepository.findIdByKey(gradableEvent.getKey()));
        });

        request.stream().filter(gradableEvent -> gradableEvent.getType().equals(EventSectionType.ASSIGNMENT)).forEach(gradableEvent -> {
            GradableEventDetailsRequestDto currentGradableEvent = currentConfigByKey.get(gradableEvent.getKey());

            updateSubmissions(((AssignmentDetailsRequestDto) gradableEvent).getSubmissionRequirements(), currentGradableEvent != null && !currentGradableEvent.getType().equals(EventSectionType.ASSIGNMENT) ? ((AssignmentDetailsRequestDto) currentGradableEvent).getSubmissionRequirements() : List.of(), gradableEventRepository.findIdByKey(gradableEvent.getKey()));
        });

        request.stream().filter(gradableEvent -> gradableEvent.getType().equals(EventSectionType.PROJECT)).forEach(gradableEvent -> {
            GradableEventDetailsRequestDto currentGradableEvent = currentConfigByKey.get(gradableEvent.getKey());
            updateProjectVariantCategories(((ProjectDetailsRequestDto) gradableEvent).getVariantCategories(), currentGradableEvent != null && !currentGradableEvent.getType().equals(EventSectionType.ASSIGNMENT) ? ((ProjectDetailsRequestDto) currentGradableEvent).getVariantCategories() : List.of(), gradableEventRepository.findIdByKey(gradableEvent.getKey()));
        });

    }

    private void updateProjectVariantCategories(List<VariantCategoryDetailsRequestDto> request, List<VariantCategoryDetailsRequestDto> currentConfig, Long gradableEventId) {
        updateEntities(request, currentConfig, gradableEventId, projectVariantCategoryUpdateStrategy);
        Map<String, VariantCategoryDetailsRequestDto> currentConfigByKey = currentConfig.stream().collect(Collectors.toMap(VariantCategoryDetailsRequestDto::getKey, Function.identity()));

        request.forEach(variantCategory -> {
            VariantCategoryDetailsRequestDto currentVariantCategory = currentConfigByKey.get(variantCategory.getKey());

            updateProjectVariants(variantCategory.getVariants(), currentVariantCategory != null ? currentVariantCategory.getVariants() : List.of(), projectVariantCategoryRepository.findIdByKey(variantCategory.getKey()));
        });
    }

    private void updateProjectVariants(List<VariantDetailsRequestDto> request, List<VariantDetailsRequestDto> currentConfig, Long variantCategoryId) {
        updateEntities(request, currentConfig, variantCategoryId, projectVariantUpdateStrategy);

    }

    private void updateSubmissions(List<SubmissionRequirementDetailsRequestDto> request, List<SubmissionRequirementDetailsRequestDto> currentConfig, Long gradableEventId) {
        updateEntities(request, currentConfig, gradableEventId, submissionRequirementUpdateStrategy);
    }

    private void updateCriteria(List<CriterionDetailsRequestDto> request, List<CriterionDetailsRequestDto> currentConfig, Long gradableEventId) {
        updateEntities(request, currentConfig, gradableEventId, criterionUpdateStrategy);

        request.forEach(criterion -> updateCriteriaRewards(criterion.getRewards(), criterionRepository.findIdByKey(criterion.getKey())));
    }

    private void updateCriteriaRewards(List<CriterionRewardDetailsRequestDto> request, Long criterionId) {
        criterionRewardRepository.deleteByCriterionId(criterionId);

        List<CriterionReward> criteriaRewards = request.stream().map(criterionReward -> {
            Reward reward = rewardRepository.findByKey(criterionReward.getRewardKey());

            return CriterionReward.builder().id(new CriterionReward.Id(criterionId, reward.getId())).reward(reward).maxAmount(criterionReward.getMaxAmount()).criterion(criterionRepository.getReferenceById(criterionId)).build();
        }).collect(Collectors.toList());

        criterionRewardRepository.saveAll(criteriaRewards);
    }

    private void updateEventSections(List<EventSectionDetailsRequestDto> request, List<EventSectionDetailsRequestDto> currentConfig, Long courseId) {
        updateEntities(request, currentConfig, courseId, eventSectionUpdateStrategy);
        Map<String, EventSectionDetailsRequestDto> currentConfigByKey = currentConfig.stream().collect(Collectors.toMap(EventSectionDetailsRequestDto::getKey, Function.identity()));

        request.forEach(eventSection -> {
            EventSectionDetailsRequestDto currentSection = currentConfigByKey.get(eventSection.getKey());

            updateGradableEvents(new ArrayList<>(eventSection.getGradableEvents()), currentSection != null ? new ArrayList<>(currentSection.getGradableEvents()) : List.of(), eventSectionRepository.findIdByKey(eventSection.getKey()));
        });
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
        strategy.flush();
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
