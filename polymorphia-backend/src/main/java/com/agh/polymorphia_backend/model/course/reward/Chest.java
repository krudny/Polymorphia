package com.agh.polymorphia_backend.model.course.reward;


import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.course.reward.item.Item;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "chests")
@ToString(exclude = {"items"})
public class Chest {
    @ManyToMany(mappedBy = "chests", fetch = FetchType.LAZY)
    Set<Item> items;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private ChestBehavior behavior;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Chest chest = (Chest) o;
        return id != null && id.equals(chest.id);
    }
}
