package com.agh.polymorphia_backend.model.event.section;

import com.agh.polymorphia_backend.dto.request.grade.EventSectionType;
import com.agh.polymorphia_backend.model.event.gradable.Assignment;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "assignment_sections")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@NoArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class AssignmentSection extends EventSection {
    @OneToMany(mappedBy = "assignmentSection", fetch = FetchType.LAZY)
    @JsonManagedReference
    @ToString.Exclude
    private Set<Assignment> assignments;

    @NotNull
    private Boolean containsTopics;

    @Override
    public Set<GradableEvent<?>> getGradableEvents() {
        return new HashSet<>(assignments);
    }

    @Override
    public EventSectionType getEventSectionType() {
        return EventSectionType.ASSIGNMENT;
    }
}
