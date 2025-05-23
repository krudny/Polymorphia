package com.agh.polymorphia_backend.model.course.reward.item;


import com.agh.polymorphia_backend.model.course.reward.Chest;
import com.agh.polymorphia_backend.model.event.section.EventSection;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@SuperBuilder
@Table(name = "items")
@ToString(exclude = {"chests"})
@Inheritance(strategy = InheritanceType.JOINED)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Item {
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
    @Column(name = "\"limit\"")
    private Integer limit;

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
