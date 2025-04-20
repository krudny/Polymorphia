package com.agh.polymorphia_backend.model.course.reward.item;


import com.agh.polymorphia_backend.model.course.reward.Chest;
import com.agh.polymorphia_backend.model.event.EventSection;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Table(name = "items")
@ToString(exclude = {"chests"})
@Inheritance(strategy = InheritanceType.JOINED)
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String imageUrl;

    @Column(name = "\"limit\"")
    private int limit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_section_id")
    private EventSection eventSection;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "chests_items",
            joinColumns = @JoinColumn(name = "item_id"),
            inverseJoinColumns = @JoinColumn(name = "chest_id")
    )
    private Set<Chest> chests;

}
