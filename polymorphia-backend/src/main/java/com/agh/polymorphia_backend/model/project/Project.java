package com.agh.polymorphia_backend.model.project;

import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Table(name = "projects")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@NoArgsConstructor
@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = true)
public class Project extends GradableEvent {

    @NotNull
    @Builder.Default
    private boolean allowCrossCourseGroupProjectGroups = false;

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
    @ToString.Exclude
    @JsonIgnore
    private List<ProjectGroup> projectGroups;

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
    @ToString.Exclude
    @JsonIgnore
    private List<ProjectVariantCategory> variantCategories;
}
