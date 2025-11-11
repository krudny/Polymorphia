package com.agh.polymorphia_backend.model.project;

import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.user.Instructor;
import com.agh.polymorphia_backend.validation.constraint.ProjectGradableEventOnly;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "project_groups")
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ProjectGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "instructor_id")
    @ToString.Exclude
    @JsonIgnore
    private Instructor instructor;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id")
    @ToString.Exclude
    @JsonIgnore
    @ProjectGradableEventOnly
    private GradableEvent project;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name="project_groups_animals",
            joinColumns = @JoinColumn(name = "project_group_id"),
            inverseJoinColumns = @JoinColumn(name = "animal_id")
    )
    private List<Animal> animals;
}
