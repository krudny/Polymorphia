package com.agh.polymorphia_backend.repository.course.reward;

import com.agh.polymorphia_backend.model.course.reward.item.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepository<T extends Item> extends JpaRepository<T, Long> {
    @Query("SELECT i FROM Item i JOIN i.chests c WHERE c.id = :chestId")
    List<Item> findAllByChestId(Long chestId);

    @Query("SELECT i FROM Item i JOIN i.eventSection e WHERE e.course.id = :courseId")
    List<Item> findAllByCourseId(Long courseId);
}
