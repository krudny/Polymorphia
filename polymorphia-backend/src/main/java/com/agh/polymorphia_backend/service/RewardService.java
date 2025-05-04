package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.dto.request.course.reward.ChestRequestDto;
import com.agh.polymorphia_backend.dto.request.course.reward.item.ItemRequestDto;
import com.agh.polymorphia_backend.dto.response.course.reward.item.ItemResponseDto;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.course.reward.Chest;
import com.agh.polymorphia_backend.model.course.reward.item.Item;
import com.agh.polymorphia_backend.repository.course.reward.ChestRepository;
import com.agh.polymorphia_backend.repository.course.reward.ItemRepository;
import com.agh.polymorphia_backend.service.mapper.ChestMapper;
import com.agh.polymorphia_backend.service.mapper.ItemMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RewardService {
    public static final String CHEST_NOT_FOUND = "Chests of ids [%s] not found";
    private static final String ITEM_NOT_FOUND = "Items of ids [%s] not found";

    // repositories
    private final ChestRepository chestRepository;
    private final ItemRepository<Item> itemRepository;

    // mappers
    private final ItemMapper itemMapper;
    private final ChestMapper chestMapper;

    public Long addChest(ChestRequestDto chestRequestDto, String imageUrl) {
        return chestRepository.save(chestMapper.chestRequestDtoToChest(chestRequestDto, imageUrl)).getId();
    }

    public Long addItem(ItemRequestDto itemRequestDto, String imageUrl) {
        return itemRepository.save(itemMapper.itemRequestDtoToItem(itemRequestDto, imageUrl)).getId();
    }

    public ItemResponseDto getItemById(Long itemId) {
        return itemMapper.itemToResponseItemDto(itemRepository.findById(itemId)
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

    public List<ItemResponseDto> getAllChestItems(Long chestId) {
        List<Item> items = itemRepository.findAllByChestId(chestId);
        return items.stream().map(itemMapper::itemToResponseItemDto).toList();
    }
}
