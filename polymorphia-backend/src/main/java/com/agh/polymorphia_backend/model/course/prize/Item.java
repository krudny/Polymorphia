package com.agh.polymorphia_backend.model.course.prize;


import com.agh.polymorphia_backend.model.event.EventSection;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "items")
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
