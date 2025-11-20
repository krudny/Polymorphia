package com.agh.polymorphia_backend.repository.reward;

import com.agh.polymorphia_backend.model.reward.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findAllByCourseId(Long courseId);

    @Query("""
                SELECT i FROM Item i
                WHERE i.course.id = :courseId
                  AND (:excludedItemIds is null OR i.id NOT IN :excludedItemIds)
            """)
    List<Item> findAllByCourseIdAndItemIdNotIn(Long courseId, List<Long> excludedItemIds);
}