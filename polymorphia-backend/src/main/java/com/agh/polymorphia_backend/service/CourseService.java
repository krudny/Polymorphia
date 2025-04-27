package com.agh.polymorphia_backend.service;


import com.agh.polymorphia_backend.dto.request.course.reward.ChestRequestDto;
import com.agh.polymorphia_backend.dto.request.course.reward.item.FlatBonusRequestItemRequestDto;
import com.agh.polymorphia_backend.dto.request.course.reward.item.ItemRequestDto;
import com.agh.polymorphia_backend.dto.request.course.reward.item.ItemType;
import com.agh.polymorphia_backend.dto.request.course.reward.item.PercentageBonusItemRequestDto;
import com.agh.polymorphia_backend.dto.response.course.EvolutionStageResponseDto;
import com.agh.polymorphia_backend.dto.response.course.reward.ChestResponseDto;
import com.agh.polymorphia_backend.dto.response.course.reward.item.FlatBonusItemResponseDto;
import com.agh.polymorphia_backend.dto.response.course.reward.item.ItemResponseDto;
import com.agh.polymorphia_backend.dto.response.course.reward.item.PercentageBonusItemResponseDto;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.exception.database.UnknownSubclassException;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.course.EvolutionStage;
import com.agh.polymorphia_backend.model.course.reward.Chest;
import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItem;
import com.agh.polymorphia_backend.model.course.reward.item.Item;
import com.agh.polymorphia_backend.model.course.reward.item.PercentageBonusItem;
import com.agh.polymorphia_backend.model.event.CourseworkSection;
import com.agh.polymorphia_backend.model.event.EventSection;
import com.agh.polymorphia_backend.model.event.ProjectSection;
import com.agh.polymorphia_backend.model.event.TestSection;
import com.agh.polymorphia_backend.repository.course.CourseRepository;
import com.agh.polymorphia_backend.repository.course.EvolutionStagesRepository;
import com.agh.polymorphia_backend.repository.course.reward.ChestRepository;
import com.agh.polymorphia_backend.repository.course.reward.ItemRepository;
import com.agh.polymorphia_backend.repository.event.EventSectionRepository;
import lombok.AllArgsConstructor;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.HashSet;
import java.util.List;

@Service
@AllArgsConstructor
public class CourseService {
    private static final String CHEST_NOT_FOUND = "Chests of ids [%s] not found";
    private static final String ITEM_NOT_FOUND = "Items of ids [%s] not found";
    private static final String EVENT_SECTION_NOT_FOUND = "Event section not found";
    private static final String UNKNOWN_EVENT_SECTION = "Unknown event section subtype";

    private static final String FLAT_BONUS_ITEM_TEXT = "+%sxp do eventów kategorii %s: \"%s\"";
    private static final String PERCENTAGE_BONUS_ITEM_TEXT = "+%s%% do eventów kategorii %s: \"%s\"";
    private static final String PERCENTAGE_TEXT_BEHAVIOR = "Działa automatycznie, nie wymaga aktywacji";

    private final EvolutionStagesRepository evolutionStagesRepository;
    private final ChestRepository chestRepository;
    private final CourseRepository courseRepository;
    private final ItemRepository<Item> itemRepository;

    private final EventSectionRepository eventSectionRepository;


    public List<EvolutionStageResponseDto> getEvolutionStages(Long courseId) {
        return evolutionStagesRepository.findAllByCourseId(courseId)
                .stream().map(this::evolutionStageToEvolutionStageResponseDto)
                .sorted(Comparator.comparingInt(EvolutionStageResponseDto::minXp))
                .toList();
    }

    public List<ChestResponseDto> getAllChests(Long courseId) {
        List<Chest> chests = chestRepository.findAllByCourseId(courseId);
        return chests.stream().map(chest ->
                chestToChestResponseDto(courseId, chest)
        ).toList();
    }

    public List<ItemResponseDto> getAllChestItems(long chestId) {
        List<Item> items = itemRepository.findAllByChestId(chestId);

        return items.stream().map(this::itemToResponseItemDto).toList();
    }

    public List<ItemResponseDto> getAllCourseItems(long courseId) {
        List<Item> items = itemRepository.findAllByCourseId(courseId);
        return items.stream().map(this::itemToResponseItemDto).toList();
    }

    public Long addChest(ChestRequestDto chestRequestDto) {
        Course course = courseRepository.findById(chestRequestDto.courseId())
                .orElseThrow(() -> new InvalidArgumentException(CHEST_NOT_FOUND));
        Chest chest = Chest.builder()
                .course(course)
                .behavior(chestRequestDto.behavior())
                .name(chestRequestDto.name())
                .imageUrl(chestRequestDto.imageUrl())
                .description(chestRequestDto.description())
                .build();
        return chestRepository.save(chest).getId();
    }

    public Long addItem(ItemRequestDto itemRequestDto) {
        return itemRepository.save(itemRequestDtoToItem(itemRequestDto)).getId();
    }

    public ItemResponseDto getItemById(Long itemId) {
        return itemToResponseItemDto(itemRepository.findById(itemId)
                .orElseThrow(() -> new InvalidArgumentException(
                                String.format(ITEM_NOT_FOUND, itemId
                                )
                        )
                )
        );
    }

    public void addItemsToChest(List<Long> itemIds, Long chestId) {
        Chest chest = chestRepository.findById(chestId).orElseThrow(() -> new InvalidArgumentException(String.format(CHEST_NOT_FOUND, chestId)));

        itemIds.forEach(item -> addItemToChest(item, chest));
    }

    private void addItemToChest(Long itemId, Chest chest) {
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new InvalidArgumentException(String.format(ITEM_NOT_FOUND, itemId)));
        item.getChests().add(chest);

        itemRepository.save(item);
    }

    private EvolutionStageResponseDto evolutionStageToEvolutionStageResponseDto(EvolutionStage evolutionStage) {
        return EvolutionStageResponseDto.builder()
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


    private ChestResponseDto chestToChestResponseDto(Long courseId, Chest chest) {
        return ChestResponseDto.builder()
                .id(chest.getId())
                .name(chest.getName())
                .imageUrl(chest.getImageUrl())
                .courseId(courseId)
                .behavior(chest.getBehavior())
                .description(chest.getDescription())
                .build();
    }

    private ItemResponseDto itemToResponseItemDto(Item item) {

        ItemResponseDto.ItemResponseDtoBuilder<? extends ItemResponseDto, ?> itemBuilder = item instanceof FlatBonusItem ?
                FlatBonusItemResponseDto.builder()
                        .xpBonus(((FlatBonusItem) item).getXpBonus())
                        .behavior(((FlatBonusItem) item).getBehavior())
                        .textBehavior(((FlatBonusItem) item).getBehavior().getTextValue())
                        .textBonus(getFlatBonusItemText((FlatBonusItem) item)) :

                PercentageBonusItemResponseDto.builder()
                        .percentageBonus(((PercentageBonusItem) item).getPercentageBonus())
                        .textBonus(getPercentageBonusItemText((PercentageBonusItem) item))
                        .textBehavior(PERCENTAGE_TEXT_BEHAVIOR);

        return itemBuilder
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .imageUrl(item.getImageUrl())
                .limit(item.getLimit())
                .eventSectionId(item.getEventSection().getId())
                .chestIds(item.getChests().stream().map(Chest::getId).toList())
                .build();

    }

    private String getFlatBonusItemText(FlatBonusItem item) {
        return String.format(FLAT_BONUS_ITEM_TEXT, item.getXpBonus(),
                getEventTypeText(item.getEventSection()),
                item.getEventSection().getName()
        );
    }

    private String getPercentageBonusItemText(PercentageBonusItem item) {
        return String.format(PERCENTAGE_BONUS_ITEM_TEXT,
                item.getPercentageBonus(),
                getEventTypeText(item.getEventSection()),
                item.getEventSection().getName()
        );
    }

    private Item itemRequestDtoToItem(ItemRequestDto itemRequestDto) {
        EventSection eventSection = eventSectionRepository.findById(itemRequestDto.getEventSectionId())
                .orElseThrow(() -> new InvalidArgumentException(EVENT_SECTION_NOT_FOUND));

        Item.ItemBuilder<? extends Item, ?> itemBuilder = itemRequestDto.getType().equals(ItemType.FLAT_BONUS) ?
                FlatBonusItem.builder().xpBonus(((FlatBonusRequestItemRequestDto) itemRequestDto).getXpBonus())
                        .behavior(((FlatBonusRequestItemRequestDto) itemRequestDto).getBehavior())
                : PercentageBonusItem.builder()
                .percentageBonus(((PercentageBonusItemRequestDto) itemRequestDto).getPercentageBonus());

        return itemBuilder
                .limit(itemRequestDto.getLimit())
                .name(itemRequestDto.getName())
                .imageUrl(itemRequestDto.getImageUrl())
                .description(itemRequestDto.getDescription())
                .eventSection(eventSection)
                .chests(new HashSet<>())
                .build();

    }

    private String getEventTypeText(EventSection sectionProxy) {
        EventSection section = (EventSection) ((HibernateProxy) sectionProxy).getHibernateLazyInitializer().getImplementation();

        if (section instanceof TestSection) return "testowej";
        if (section instanceof CourseworkSection) return "laboratoryjnej";
        if (section instanceof ProjectSection) return "projektowej";
        throw new UnknownSubclassException(UNKNOWN_EVENT_SECTION);
    }

}
