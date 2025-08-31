package com.agh.polymorphia_backend.repository.course.reward;

import com.agh.polymorphia_backend.model.course.reward.item.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findAllByCourseId(Long courseId);
}