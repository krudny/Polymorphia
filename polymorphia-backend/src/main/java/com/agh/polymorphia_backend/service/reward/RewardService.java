package com.agh.polymorphia_backend.service.reward;

import com.agh.polymorphia_backend.model.reward.Item;
import com.agh.polymorphia_backend.model.reward.item.ItemType;
import com.agh.polymorphia_backend.repository.reward.RewardRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class RewardService {
    private final RewardRepository rewardRepository;

    public List<Item> filterItemsByType(List<Item> items, ItemType type) {
        return items.stream()
                .filter(item -> item.getItemType().equals(type))
                .toList();
    }

    public com.agh.polymorphia_backend.model.reward.Reward findById(Long id) {
        String message = String.format("Nie znaleziono nagrody o id %d.", id);
        return rewardRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, message));
    }
}
