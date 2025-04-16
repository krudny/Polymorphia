package com.agh.polymorphia_backend.service;


import com.agh.polymorphia_backend.dto.ChestDto;
import com.agh.polymorphia_backend.dto.EvolutionStageDto;
import com.agh.polymorphia_backend.dto.ItemDto;
import com.agh.polymorphia_backend.exception.database.ResourceNotFoundException;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.course.EvolutionStage;
import com.agh.polymorphia_backend.model.course.prize.Chest;
import com.agh.polymorphia_backend.model.course.prize.Item;
import com.agh.polymorphia_backend.model.event.EventSection;
import com.agh.polymorphia_backend.repository.course.CourseRepository;
import com.agh.polymorphia_backend.repository.course.EvolutionStagesRepository;
import com.agh.polymorphia_backend.repository.course.prize.ChestRepository;
import com.agh.polymorphia_backend.repository.course.prize.ItemRepository;
import com.agh.polymorphia_backend.repository.event.EventSectionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class CourseService {
    private static final String CHEST_NOT_FOUND = "Chests of ids [%s] not found";
    private static final String EVENT_SECTION_NOT_FOUND = "Event section not found";

    private final EvolutionStagesRepository evolutionStagesRepository;
    private final ChestRepository chestRepository;
    private final CourseRepository courseRepository;
    private final ItemRepository itemRepository;
    private final EventSectionRepository eventSectionRepository;


    public List<EvolutionStageDto> getEvolutionStages(Long courseId) {
        return evolutionStagesRepository.findAllByCourseId(courseId)
                .stream().map(this::mapToEvolutionStageDto)
                .toList();
    }

    public List<ChestDto> getAllChests(Long courseId) {
        List<Chest> chests = chestRepository.findAllByCourseId(courseId);
        return chests.stream().map(chest ->
                mapToChestDto(courseId, chest)
        ).toList();
    }

    public List<ItemDto> getAllChestItems(long chestId) {
        List<Item> items = itemRepository.findAllByChestId(chestId);
        return items.stream().map(this::mapToItemDto).toList();
    }

    public List<ItemDto> getAllCourseItems(long courseId) {
        List<Item> items = itemRepository.findAllByCourseId(courseId);
        return items.stream().map(this::mapToItemDto).toList();
    }

    public void addChest(ChestDto chestDto) {
        Course course = courseRepository.findById(chestDto.courseId()).orElseThrow(null);
        Chest chest = Chest.builder()
                .course(course)
                .behavior(chestDto.behavior())
                .name(chestDto.name())
                .imageUrl(chestDto.imageUrl())
                .description(chestDto.description())
                .build();
        chestRepository.save(chest);
    }

    public void addItemsToChests(List<ItemDto> items) {
        items.forEach(this::addItemToChests);
    }

    private void addItemToChests(ItemDto itemDto) {
        List<Chest> chests = new ArrayList<>(chestRepository.findAllById(itemDto.chestIds()));

        if (chests.isEmpty() || itemDto.chestIds().size() != chests.size()) {
            List<String> chestsNotFound = itemDto.chestIds().stream()
                    .filter(id -> chests.stream().noneMatch(chest -> chest.getId().equals(id)))
                    .map(String::valueOf)
                    .toList();

            throw new ResourceNotFoundException(String.format(CHEST_NOT_FOUND, String.join(", ", chestsNotFound)));
        }

        Item item = itemRepository.findById(itemDto.id()).orElse(mapToItem(itemDto));

        Set<Chest> chestsToAdd = new HashSet<>(chests);
        item.getChests().addAll(chestsToAdd);

        itemRepository.save(item);
    }

    private EvolutionStageDto mapToEvolutionStageDto(EvolutionStage evolutionStage) {
        return EvolutionStageDto.builder()
                .id(evolutionStage.getId())
                .name(evolutionStage.getName())
                .grade(evolutionStage.getGrade())
                .minXp(evolutionStage.getMinXp())
                .imageWithoutBgUrl(evolutionStage.getImageWithoutBgUrl())
                .imageUrl(evolutionStage.getImageUrl())
                .courseId(evolutionStage.getCourse().getId())
                .description(evolutionStage.getDescription())
                .build();
    }


    private ChestDto mapToChestDto(Long courseId, Chest chest) {
        return ChestDto.builder()
                .id(chest.getId())
                .name(chest.getName())
                .imageUrl(chest.getImageUrl())
                .courseId(courseId)
                .behavior(chest.getBehavior())
                .description(chest.getDescription())
                .build();
    }

    private ItemDto mapToItemDto(Item item) {
        Set<Chest> chests = new HashSet<>(item.getChests());
        List<Long> chestIds = chests.stream().map(Chest::getId).toList();
        return ItemDto.builder()
                .id(item.getId())
                .limit(item.getLimit())
                .name(item.getName())
                .imageUrl(item.getImageUrl())
                .description(item.getDescription())
                .chestIds(chestIds)
                .eventSectionId(item.getEventSection().getId())
                .build();
    }

    private Item mapToItem(ItemDto itemDto) {
        EventSection eventSection = eventSectionRepository.findById(itemDto.eventSectionId())
                .orElseThrow(() -> new ResourceNotFoundException(EVENT_SECTION_NOT_FOUND));

        return Item.builder()
                .limit(itemDto.limit())
                .name(itemDto.name())
                .imageUrl(itemDto.imageUrl())
                .description(itemDto.description())
                .eventSection(eventSection)
                .chests(new HashSet<>())
                .build();
    }

}
