package com.agh.polymorphia_backend.service.course.reward;

import com.agh.polymorphia_backend.model.course.reward.Item;
import com.agh.polymorphia_backend.model.course.reward.Reward;
import com.agh.polymorphia_backend.model.course.reward.item.ItemType;
import com.agh.polymorphia_backend.repository.course.reward.RewardRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class RewardService {
    private static final String REWARD_NOT_FOUND = "Nie znaleziono nagrody o id %d";
    private final RewardRepository rewardRepository;

    public List<Item> filterItemsByType(List<Item> items, ItemType type) {
        return items.stream()
                .filter(item -> item.getItemType().equals(type))
                .toList();
    }

    public Reward findById(Long id) {
        String message = String.format(REWARD_NOT_FOUND, id);
        return rewardRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, message));
    }
}
