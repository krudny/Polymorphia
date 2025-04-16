package com.agh.polymorphia_backend.repository.course.prize;

import com.agh.polymorphia_backend.model.course.prize.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    @Query("SELECT i FROM Item i JOIN i.chests c WHERE c.id = :chestId")
    List<Item> findAllByChestId(long chestId);

    @Query("SELECT i FROM Item i JOIN i.eventSection e WHERE e.course.id = :courseId")
    List<Item> findAllByCourseId(long courseId);
}
