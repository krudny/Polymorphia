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
}
