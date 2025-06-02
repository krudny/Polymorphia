package com.agh.polymorphia_backend.model.event.gradable;


import com.agh.polymorphia_backend.model.event.section.ProjectSection;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "project_criteria")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@SuperBuilder
@NoArgsConstructor
public class ProjectCriterion extends GradableEvent<ProjectSection> {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_section_id")
    @JsonBackReference
    @ToString.Exclude
    private ProjectSection projectSection;

    @NotEmpty
    private String name;

    @Override
    public ProjectSection getEventSection() {
        return projectSection;
    }
}

