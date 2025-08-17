package com.agh.polymorphia_backend.model.event.section;

import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "project_sections")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@SuperBuilder
@NoArgsConstructor
public class ProjectSection extends EventSection {

    @Override
    public EventSectionType getEventSectionType() {
        return EventSectionType.PROJECT;
    }
}
