package com.agh.polymorphia_backend.service.course.reward;

import com.agh.polymorphia_backend.model.course.reward.Item;
import com.agh.polymorphia_backend.repository.course.reward.ItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RewardService {
    private final ItemRepository itemRepository;

    public List<Item> getCourseItems(Long courseId) {
        return itemRepository.findAllByCourseId(courseId);
    }

    public List<Item> getChestItems(Long chestId) {
        List<Long> itemIds = itemRepository.findAllItemIdsByChestId(chestId);
        return itemIds.stream()
                .map(itemRepository::findById)
                .map(item -> item.orElseThrow(() -> new RuntimeException("Item not found")))
                .toList();
    }
}
