package com.agh.polymorphia_backend.service.course;


import com.agh.polymorphia_backend.dto.response.course.EvolutionStageResponseDto;
import com.agh.polymorphia_backend.dto.response.course.reward.ChestResponseDto;
import com.agh.polymorphia_backend.dto.response.course.reward.item.ItemResponseDto;
import com.agh.polymorphia_backend.model.course.reward.Chest;
import com.agh.polymorphia_backend.model.course.reward.item.Item;
import com.agh.polymorphia_backend.repository.course.EvolutionStagesRepository;
import com.agh.polymorphia_backend.repository.course.reward.ChestRepository;
import com.agh.polymorphia_backend.repository.course.reward.ItemRepository;
import com.agh.polymorphia_backend.service.mapper.ChestMapper;
import com.agh.polymorphia_backend.service.mapper.EvolutionStagesMapper;
import com.agh.polymorphia_backend.service.mapper.ItemMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
public class CourseService {

    private final EvolutionStagesRepository evolutionStagesRepository;
    private final ChestRepository chestRepository;
    private final ItemRepository<Item> itemRepository;

    private final ItemMapper itemMapper;
    private final EvolutionStagesMapper evolutionStagesMapper;
    private final ChestMapper chestMapper;

    public List<EvolutionStageResponseDto> getEvolutionStages(Long courseId) {
        return evolutionStagesRepository.findAllByCourseId(courseId)
                .stream().map(evolutionStagesMapper::evolutionStageToEvolutionStageResponseDto)
                .sorted(Comparator.comparingDouble(EvolutionStageResponseDto::minXp))
                .toList();
    }

    public List<ChestResponseDto> getAllChests(Long courseId) {
        List<Chest> chests = chestRepository.findAllByCourseId(courseId);
        return chests.stream().map(chest ->
                chestMapper.chestToChestResponseDto(courseId, chest)
        ).toList();
    }

    public List<ItemResponseDto> getAllCourseItems(Long courseId) {
        List<Item> items = itemRepository.findAllByCourseId(courseId);
        return items.stream().map(itemMapper::itemToResponseItemDto).toList();
    }
}
