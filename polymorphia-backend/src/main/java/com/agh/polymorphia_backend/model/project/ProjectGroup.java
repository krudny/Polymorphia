package com.agh.polymorphia_backend.model.project;

import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.event.gradable.Project;
import com.agh.polymorphia_backend.model.user.Instructor;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    @JsonIgnore
    @ToString.Exclude
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id")
    @JsonIgnore
    @ToString.Exclude
    private Instructor instructor;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "project_groups_animals",
            joinColumns = @JoinColumn(name = "project_group_id"),
            inverseJoinColumns = @JoinColumn(name = "animal_id")
    )
    @JsonIgnore
    @ToString.Exclude
    private Set<Animal> animals;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "project_groups_project_variants",
            joinColumns = @JoinColumn(name = "project_group_id"),
            inverseJoinColumns = @JoinColumn(name = "project_variant_id")
    )
    @JsonIgnore
    @ToString.Exclude
    private Set<ProjectVariant> projectVariants;
}
