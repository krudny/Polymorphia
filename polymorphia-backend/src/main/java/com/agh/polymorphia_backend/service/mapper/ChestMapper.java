package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.request.course.reward.ChestRequestDto;
import com.agh.polymorphia_backend.dto.response.course.reward.ChestResponseDto;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.course.reward.Chest;
import com.agh.polymorphia_backend.model.course.reward.item.Item;
import com.agh.polymorphia_backend.repository.course.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import static com.agh.polymorphia_backend.service.course.RewardService.CHEST_NOT_FOUND;

@Service
@AllArgsConstructor
public class ChestMapper {

    private final CourseRepository courseRepository;

    public ChestResponseDto chestToChestResponseDto(Long courseId, Chest chest) {
        return ChestResponseDto.builder()
                .id(chest.getId())
                .name(chest.getName())
                .imageUrl(chest.getImageUrl())
                .courseId(courseId)
                .behavior(chest.getBehavior().getTextValue())
                .description(chest.getDescription())
                .itemIds(chest.getItems().stream().map(Item::getId).toList())
                .build();
    }

    public Chest chestRequestDtoToChest(ChestRequestDto chestRequestDto, String imageUrl) {
        Course course = courseRepository.findById(chestRequestDto.courseId())
                .orElseThrow(() -> new InvalidArgumentException(CHEST_NOT_FOUND));
        return Chest.builder()
                .course(course)
                .behavior(chestRequestDto.behavior())
                .name(chestRequestDto.name())
                .imageUrl(imageUrl)
                .description(chestRequestDto.description())
                .build();
    }
}
