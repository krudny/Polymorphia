package com.agh.polymorphia_backend.model.course.reward;

import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.course.reward.item.Item;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;

@Entity
@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "chests")
@ToString(exclude = {"items"})
public class Chest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @NotEmpty
    private String name;

    @NotEmpty
    @Column(length = 1000)
    private String description;

    @NotEmpty
    private String imageUrl;

    @NotNull
    @Enumerated(EnumType.STRING)
    private ChestBehavior behavior;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToMany(mappedBy = "chests", fetch = FetchType.LAZY)
    Set<Item> items;
}
