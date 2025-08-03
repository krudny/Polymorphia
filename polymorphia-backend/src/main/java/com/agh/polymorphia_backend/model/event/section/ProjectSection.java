package com.agh.polymorphia_backend.model.event.section;

import com.agh.polymorphia_backend.dto.request.grade.EventSectionType;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.event.gradable.ProjectCriterion;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "project_sections")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@SuperBuilder
@NoArgsConstructor
public class ProjectSection extends EventSection {
    @NotEmpty
    private String infoUrl;

    @NotEmpty
    private Integer roadMapOrder;
    private boolean hidden = false;

    @OneToMany(mappedBy = "projectSection", fetch = FetchType.LAZY)
    @JsonManagedReference
    @ToString.Exclude
    private Set<ProjectCriterion> projectCriteria;

    @Override
    public Set<GradableEvent<?>> getGradableEvents() {
        return new HashSet<>(projectCriteria);
    }

    @Override
    public EventSectionType getEventSectionType() {
        return EventSectionType.PROJECT;
    }
}
