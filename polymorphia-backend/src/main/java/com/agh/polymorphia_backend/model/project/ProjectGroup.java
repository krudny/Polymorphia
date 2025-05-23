package com.agh.polymorphia_backend.model.project;

import com.agh.polymorphia_backend.model.course.Animal;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "project_groups")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ProjectGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "project_groups_animals",
            joinColumns = @JoinColumn(name = "project_group_id"),
            inverseJoinColumns = @JoinColumn(name = "animal_id")
    )
    @JsonManagedReference
    @ToString.Exclude
    private Set<Animal> animals;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "project_groups_project_variants",
            joinColumns = @JoinColumn(name = "project_group_id"),
            inverseJoinColumns = @JoinColumn(name = "project_variant_id")
    )
    @ToString.Exclude
    private Set<ProjectVariant> projectVariants;
}
