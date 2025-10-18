package com.agh.polymorphia_backend.service.course.reward;

import com.agh.polymorphia_backend.model.course.reward.Item;
import com.agh.polymorphia_backend.model.course.reward.item.ItemType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RewardService {
    public List<Item> filterItemsByType(List<Item> items, ItemType type) {
        return items.stream()
                .filter(item -> item.getItemType().equals(type))
                .toList();
    }
}
