package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.request.course.reward.item.FlatBonusRequestItemRequestDto;
import com.agh.polymorphia_backend.dto.request.course.reward.item.ItemRequestDto;
import com.agh.polymorphia_backend.dto.request.course.reward.item.ItemType;
import com.agh.polymorphia_backend.dto.request.course.reward.item.PercentageBonusItemRequestDto;
import com.agh.polymorphia_backend.dto.response.course.reward.item.FlatBonusItemResponseDto;
import com.agh.polymorphia_backend.dto.response.course.reward.item.ItemResponseDto;
import com.agh.polymorphia_backend.dto.response.course.reward.item.PercentageBonusItemResponseDto;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.course.reward.Chest;
import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItem;
import com.agh.polymorphia_backend.model.course.reward.item.Item;
import com.agh.polymorphia_backend.model.course.reward.item.PercentageBonusItem;
import com.agh.polymorphia_backend.model.event.section.EventSection;
import com.agh.polymorphia_backend.repository.event.EventSectionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
@AllArgsConstructor
public class ItemMapper {
    private static final String BONUS_TEXT = "%s do eventów z kategorii %s";
    private static final String XP_TEXT = "+%d xp";
    private static final String PERCENT_TEXT = "+%d%%";

    private static final String PERCENTAGE_TEXT_BEHAVIOR = "Działa automatycznie, nie wymaga aktywacji";
    private static final String EVENT_SECTION_NOT_FOUND = "Event section not found";

    private final EventSectionRepository eventSectionRepository;

    public Item itemRequestDtoToItem(ItemRequestDto itemRequestDto, String imageUrl) {
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
                .imageUrl(imageUrl)
                .description(itemRequestDto.getDescription())
                .eventSection(eventSection)
                .chests(new HashSet<>())
                .build();
    }

    public ItemResponseDto itemToResponseItemDto(Item item) {

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
        return getBonusText(item, String.format(XP_TEXT, item.getXpBonus()));
    }

    private String getPercentageBonusItemText(PercentageBonusItem item) {
        return getBonusText(item, String.format(PERCENT_TEXT, item.getPercentageBonus()));
    }

    private String getBonusText(Item item, String bonusValueText) {
        return String.format(BONUS_TEXT, bonusValueText, item.getEventSection().getName());
    }
}
