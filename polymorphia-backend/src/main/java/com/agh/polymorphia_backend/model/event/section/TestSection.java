package com.agh.polymorphia_backend.model.event.section;

import com.agh.polymorphia_backend.dto.request.grade.EventSectionType;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.event.gradable.Test;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "test_sections")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class TestSection extends EventSection {
    @OneToMany(mappedBy = "testSection", fetch = FetchType.LAZY)
    @JsonManagedReference
    @ToString.Exclude
    private Set<Test> tests;

    @Override
    public Set<GradableEvent<?>> getGradableEvents() {
        return new HashSet<>(tests);
    }

    @Override
    public EventSectionType getEventSectionType() {
        return EventSectionType.TEST;
    }
}
